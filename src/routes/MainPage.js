import React, {useEffect, useState} from "react";
import '../App.css';
import {Link} from "react-router-dom";

async function loadData() {
    var response = await fetch("http://localhost:3001/api/getDatasGames")
    return await response.json()
}

function TitleBannerComponent() {
    return (
        <div className="pt-10 pb-3">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Only
                <mark
                    className="px-2 text-white bg-blue-600 items-center text-center rounded dark:bg-blue-500">Fun</mark>
            </h1>
        </div>
    );
}

function VideoGameCardComponent(props) {
    return (
        <div className="pt-10">
            <div
                className="pb-0 relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border items-center ml-10">
                <div
                    className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 flex flex-column w-xx">
                    <img
                        src={props.dataGame.infos.imageCard}
                    />
                </div>
                <div className="p-6">
                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center">
                        {props.dataGame.infos.name}
                    </h5>
                    <p className="block font-sans text-justify antialiased font-light leading-relaxed text-inherit">
                        {props.dataGame.infos.description}
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <Link to={`/VideoGamePresentation/${props.dataGame.id}`}
                          className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-600 transition-all hover:shadow-lg hover:shadow-red-600 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    );
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

function MainPage() {
    const [dataGame, setData] = useState(undefined);

    useEffect(() => {
        loadData().then((data) => {
            setData(data.Games)
        })
    }, []);

    if (dataGame === undefined) {
        return (
            <div className="App">
                <header className="App-header">
                    <LoadingComponent/>
                </header>
            </div>
        );
    } else {
        return (
            <div className="dark:bg-gray-900 min-h-screen">
                <header>
                    <TitleBannerComponent/>
                </header>
                {dataGame.map((dataGame) => VideoGameCardComponent({dataGame}))}
            </div>
        );
    }
}

export default MainPage;