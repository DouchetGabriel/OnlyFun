import '../App.css';
import {Link, useNavigate} from "react-router-dom";
import {DataGameProvider, useData} from "../context/UseData";
import {TokenProvider, useToken} from "../context/useToken";
import {useEffect, useState} from "react";
import {UserProvider, useUser} from "../context/UseUser";

function TitleBannerComponent() {
    const {clearToken} = useToken()

    return (
        <div className="pt-10 pb-3">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center"> Only
                <mark
                    className="px-2 text-white bg-blue-600 items-center text-center rounded dark:bg-blue-500"> Fun </mark>
            </h1>

            <div className="absolute top-7 right-10 h-16 w-16">
                <Link onClick={clearToken}
                      to="/"
                      className="items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Logout
                </Link>
            </div>
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

function CreateNewGameButtonComponent() {
    return (
        <div className="items-center justify-center bottom-6 right-6 fixed">
            <Link to="/CreateGame"
                  className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                <svg className="w-4 h-4 text-white text-center items-center" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 1v16M1 9h16"/>
                </svg>
            </Link>
        </div>
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

function MainPage() {

    const {dataGame} = useData();
    const {token} = useToken();
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3001/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(async response => {
            return await response.json().then((data) => {
                console.log(data)
            })
        })
    }, [])

    if (dataGame === undefined) {
        return (
            <div className="App">
                <header className="App-header">
                    <LoadingComponent/>
                </header>
            </div>
        );
    } else if(!token) {
        console.log("Vous n'avez pas de token")
        navigate("/")
    } else {
        return (
            <div className="dark:bg-gray-900 min-h-screen">
                <header>
                    <TitleBannerComponent/>
                </header>
                <div className={"flex justify-center items-start flex-wrap"}>
                    {dataGame.map((dataGame) => <VideoGameCardComponent dataGame={dataGame} key={dataGame.id}/>)}

                    <CreateNewGameButtonComponent/>
                </div>
            </div>
        );
    }
}

// Le Wrapper permet de placer les components de la Main Page directement dans le provider et donc de récupérer les données
function MainPageWrapper() {
    return (
        <TokenProvider>
            <UserProvider>
                <DataGameProvider>
                    <MainPage/>
                </DataGameProvider>
            </UserProvider>
        </TokenProvider>
    )
}

export default MainPageWrapper;