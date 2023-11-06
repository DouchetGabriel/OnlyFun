import {DataGameProvider} from "../Context/UseData";
import React from "react";

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

function CreateGame() {
    return (
        <div className={"dark:bg-gray-900 min-h-screen"}>
            <TitleBannerComponent/>
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