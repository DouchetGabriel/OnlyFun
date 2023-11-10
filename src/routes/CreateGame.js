import {DataGameProvider, useData} from "../context/UseData";
import React, {useRef} from "react";
import {Link} from "react-router-dom";

function TitleBannerComponent() {
    return (
        <div className="pt-10 pb-3">
            <h1 className="mb-4 text-lg font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
                Create your own game or publish a new game on Only
                <mark className="text-white bg-blue-600 items-center text-center rounded dark:bg-blue-500"> Fun </mark>
            </h1>
        </div>
    )
}

function CreateGameFormComponent() {
    const {addNewGame} = useData()

    const nameInput = useRef()
    const descriptionTextArea = useRef()
    const releaseDateInput = useRef()
    const developersInput = useRef()
    const typeOfGameInput = useRef()
    const pegiInput = useRef()
    const imageBannerLinkInput = useRef()
    const imageBannerCardLinkInput = useRef()
    const youtubeLinkVideoInput = useRef()

    async function onSubmit(event) {
        event.preventDefault()

        const name = nameInput.current.value
        const description = descriptionTextArea.current.value
        const releaseDate = releaseDateInput.current.value
        const developers = developersInput.current.value
        const typeOfGame = typeOfGameInput.current.value
        const pegi = pegiInput.current.value
        const imageBannerLink = imageBannerLinkInput.current.value
        const imageBannerCardLink = imageBannerCardLinkInput.current.value
        const youtubeLinkVideo = youtubeLinkVideoInput.current.value

        if(name || description || releaseDate || developers || typeOfGame || pegi || imageBannerLink || imageBannerCardLink || youtubeLinkVideo === undefined || name || description || releaseDate || developers || typeOfGame || pegi || imageBannerLink || imageBannerCardLink || youtubeLinkVideo === "" ) {
            return
        } else {
            addNewGame(name, description, releaseDate, developers, typeOfGame, pegi, imageBannerLink, imageBannerCardLink, youtubeLinkVideo)
        }
    }

    return (
        <div className="bg-white border rounded-lg px-8 py-6 mx-auto max-w-2xl pb-3">
            <h2 className="text-2xl font-medium mb-4"> Enter the informations of the game </h2>

            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2"> Name </label>
                    <input
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        ref={nameInput}
                        required/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2"> Description </label>
                    <textarea
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        rows="5"
                        ref={descriptionTextArea}
                        required/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2"> Release date </label>
                    <input
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        ref={releaseDateInput}
                        required/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2"> Developers </label>
                    <input
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        ref={developersInput}
                        required/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2"> Type of game </label>
                    <input
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        ref={typeOfGameInput}
                        required/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2"> PEGI </label>
                    <select
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        ref={pegiInput}
                        required>
                        <option value=""> Selected PEGI</option>
                        <option value="3"> 3</option>
                        <option value="7"> 7</option>
                        <option value="12"> 12</option>
                        <option value="16"> 16</option>
                        <option value="18"> 18</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2"> Image banner link </label>
                    <input
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        ref={imageBannerLinkInput}
                        required/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2"> Image card banner link </label>
                    <input
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        ref={imageBannerCardLinkInput}
                        required/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2"> Youtube video link </label>
                    <input
                        className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        ref={youtubeLinkVideoInput}
                        required/>
                </div>

                <div>
                    <Link type="submit"
                          onClick={onSubmit}
                          to={"/MainPage"}
                          className="items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Save
                    </Link>
                </div>

            </form>
        </div>
    )
}

function CreateGame() {
    return (
        <div className="dark:bg-gray-900">
            <header>
                <TitleBannerComponent/>
            </header>
            <div className="min-h-screen">
                <CreateGameFormComponent/>
            </div>
        </div>
    )
}

function CreateGameWrapper() {
    return (
        <DataGameProvider>
            <CreateGame/>
        </DataGameProvider>
    )
}

export default CreateGameWrapper;