import {DataGameProvider} from "../Context/UseData";
import React from "react";


function CreateGame() {
    return (
        <div className={"dark:bg-gray-900 min-h-screen"}>

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