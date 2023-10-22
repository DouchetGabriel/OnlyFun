import React, {useEffect, useState} from "react";
import '../App.css';
import {useLoaderData} from "react-router-dom";

export async function loader ({ params }) {
    var response = await fetch("http://localhost:3001/api/recoverGame/" + params.id)
    return await response.json()
}

function ImageBannerComponent(props) {
    return (
        <div className="relative bg-cover bg-no-repeat" style={{
            "background-position": "50%",
            "background-image": "url(" + props.dataGame.infos.imageBanner + ")", "height": "500px"
        }}>
            <div
                className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
                <div className="flex h-full items-center justify-center">
                    <div className="px-6 text-center text-white md:px-12">
                        <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                            {props.dataGame.infos.name}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

function GameDescriptionComponent(props) {
    return (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-40">
            <a className="block mb-auto rounded-xl shadow-xl transition ml-20 text-center border-double border-4 border-cyan-700 mt-3">
                <h2 className="mt-4 text-xl font-bold text-white mb-4">Description</h2>

                <p className="mt-1 text-sm text-gray-300 mb-4">
                    {props.dataGame.infos.description}
                </p>
            </a>

            <InfoGameComponent dataGame={props.dataGame}/>
        </div>
    )
}

function InfoGameComponent(props) {
    return (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-40 ml-96 mb-20">
            <a className="block rounded-xl shadow-xl transition mb-auto ml-auto text-center border-double border-4 border-red-600">
                <h2 className="mt-4 text-xl font-bold text-white mb-4">Infos</h2>

                <p className="mt-1 text-sm text-gray-300 mb-4">
                    <ul>
                        <li>PEGI : {props.dataGame.infos.pegi}</li>
                        <li>Date de sortie : {props.dataGame.infos.date}</li>
                        <li>Developers : {props.dataGame.infos.developers}</li>
                        <li>Type : {props.dataGame.infos.type}</li>
                    </ul>
                </p>
            </a>
        </div>
    )
}

function YoutubeVideoComponent(props) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="h1 font-bold text-gray-300">Vidéo</div>
                <p>
                    <iframe width="100%" height="600" src={props.dataGame.infos.youtubeVideoLink}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                </p>
            </div>
        </div>
    )
}

function CommentsSectionComponent(props) {
    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments space</h2>
                </div>
                <form className="mb-6">
                    <div
                        className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="6"
                                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                  placeholder="Write a comment..." required></textarea>
                    </div>
                    <button type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 border border-amber-50">
                        Post comment
                    </button>
                </form>
                {props.dataGame.comments.map((comment) => {
                    return CommentsComponent(comment)
                })}
            </div>
        </section>
    )
}

function CommentsComponent(comment) {
    return (
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p key={comment.id}
                       className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={comment.author.avatar}/>
                        {comment.author.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time pubdate dateTime="2022-02-08"
                              title="February 8th, 2022">Feb. 8, 2022
                        </time>
                    </p>
                </div>
                <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 16 3">
                        <path
                            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                    <span className="sr-only">Comment settings</span>
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
            <p key={comment.id} className="text-gray-500 dark:text-gray-400">
                {comment.text}
            </p>
            <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                        className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                    </svg>
                    Reply
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

export default function VideoGamePresentation() {

    const { dataGame } = useLoaderData();

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
                <ImageBannerComponent dataGame={dataGame}/>
                <GameDescriptionComponent dataGame={dataGame}/>
                <YoutubeVideoComponent dataGame={dataGame}/>
                <CommentsSectionComponent dataGame={dataGame}/>
            </div>
        );
    }
}