import React, {useRef} from "react";
import '../App.css';
import {useLoaderData} from "react-router-dom";
import {DataGameProvider, useData} from "../Context/UseData";

function ImageBannerComponent() {
    const dataGame = useLoaderData();

    return (
        <div className="relative bg-cover bg-no-repeat" style={{
            "background-position": "50%",
            "background-image": "url(" + dataGame.infos.imageBanner + ")", "height": "500px"
        }}>
            <div
                className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
                <div className="flex h-full items-center justify-center">
                    <div className="px-6 text-center text-white md:px-12">
                        <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                            {dataGame.infos.name}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

function GameDescriptionComponent() {
    const dataGame = useLoaderData();

    return (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-40">
            <a className="block mb-auto rounded-xl shadow-xl transition ml-20 text-center border-double border-4 border-cyan-700 mt-3">
                <h2 className="mt-4 text-xl font-bold text-white mb-4">Description</h2>

                <p className="mt-1 text-sm text-gray-300 mb-4">
                    {dataGame.infos.description}
                </p>
            </a>

            <InfoGameComponent/>
        </div>
    )
}

function InfoGameComponent() {
    const dataGame = useLoaderData()

    return (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-40 ml-96 mb-20">
            <a className="block rounded-xl shadow-xl transition mb-auto ml-auto text-center border-double border-4 border-red-600">
                <h2 className="mt-4 text-xl font-bold text-white mb-4">Infos</h2>

                <p className="mt-1 text-sm text-gray-300 mb-4">
                    <ul>
                        <li>PEGI : {dataGame.infos.pegi}</li>
                        <li>Date de sortie : {dataGame.infos.date}</li>
                        <li>Developers : {dataGame.infos.developers}</li>
                        <li>Type : {dataGame.infos.type}</li>
                    </ul>
                </p>
            </a>
        </div>
    )
}

function YoutubeVideoComponent() {
    const dataGame = useLoaderData();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="h1 font-bold text-gray-300">Vidéo</div>
                <p>
                    <iframe width="100%" height="600" src={dataGame.infos.youtubeVideoLink}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture ; web-share"
                            allowFullScreen></iframe>
                </p>
            </div>
        </div>
    )
}

function CommentsSectionComponent() {
    const dataGame = useLoaderData();
    const {addComment} = useData();

    const commentTextArea = useRef()
    const authorNameTextArea = useRef()

    async function onSubmit(event) {
        event.preventDefault()

        const comment = commentTextArea.current.value;
        const authorName = authorNameTextArea.current.value;

        console.log("onSubmit => ", comment, authorName)

        addComment(dataGame, authorName, comment);

        commentTextArea.current.value = ""
        authorNameTextArea.current.value = ""
    }

    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Commentaires</h2>
                </div>

                {dataGame.comments.map((comment) => <CommentsComponent comment={comment} key={comment.id}/>)}

                <form className="mb-6 mt-3" onSubmit={(e) => e.preventDefault()}>
                    <div
                        className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <textarea placeholder="Votre pseudo"
                                  id="authorNameTextArea"
                                  ref={authorNameTextArea}
                                  required
                                  className="px-0 w-full text-lg pb-0 text-gray-400 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800">
                        </textarea>
                    </div>
                    <div
                        className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <textarea rows="6"
                                  id="commentTextArea"
                                  className="px-0 w-full text-lg pb-0 text-gray-400 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                  placeholder="Exprimez-vous..."
                                  ref={commentTextArea}
                                  required>
                        </textarea>
                    </div>
                    <button type={"submit"}
                            onClick={onSubmit}
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 border border-amber-50">
                        Envoyer
                    </button>
                </form>
            </div>
        </section>
    )
}

function CommentsComponent(props) {
    const {deleteComment} = useData();
    const dataGame = useLoaderData();

    return (
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p key={props.comment.id}
                       className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={props.comment.author.avatar}/>
                        {props.comment.author.name}
                    </p>
                </div>

                <button id="dropdownComment1Button"
                        data-dropdown-toggle="dropdownComment1"
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="submit"
                        onClick={() => deleteComment(dataGame, props.comment.author.name, props.comment.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                         className="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>

                <div id="dropdownComment1"
                     className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownMenuIconHorizontalButton">
                        <li>
                            <a href="#"
                               className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                        </li>
                        <li>
                            <a href="#"
                               className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                        </li>
                    </ul>
                </div>
            </footer>

            <p key={props.comment.id} className="text-amber-50 dark:text-amber-50">
                {props.comment.text}
            </p>

            <div className="flex items-center mt-4 space-x-4">
                <button type="submit"
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"/>
                    </svg>
                </button>
            </div>
        </article>
    )
}

function LoadingComponent() {
    return (
        <div className="flex flex-auto flex-col justify-center p-4 md:p-5">
            <div className="flex justify-center">
                <div className="pr-3 text-4xl text-blue-50">
                    Loading...
                </div>

                <div
                    className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-50 rounded-full mr-3"
                    role="status" aria-label="loading">
                </div>
            </div>
        </div>
    )
}

function VideoGamePresentation() {

    const dataGame = useLoaderData();

    if (dataGame === undefined) {
        return (
            <div className="App">
                <header className="App-header">
                    <LoadingComponent/>
                </header>
            </div>
        )
    } else {
        return (
            <div className="dark:bg-gray-900" id="dataGame">
                <ImageBannerComponent/>
                <GameDescriptionComponent/>
                <YoutubeVideoComponent/>
                <CommentsSectionComponent/>
            </div>
        );
    }
}

function VideoGamePresentationWrapper() {
    return (
        <DataGameProvider>
            <VideoGamePresentation/>
        </DataGameProvider>
    )
}

export default VideoGamePresentationWrapper;