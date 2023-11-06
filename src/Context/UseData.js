import {createContext, useContext, useEffect, useState} from "react";

const dataGameContext = createContext(null)

export function useData() {
    return useContext(dataGameContext)
}

// Fetch to API
async function loadData() {
    var response = await fetch("http://localhost:3001/api/getDataGames")
    return await response.json()
}

export async function loader({params}) {
    var response = await fetch("http://localhost:3001/api/recoverGame/" + params.id)
    return await response.json()
}

// Provider
export function DataGameProvider(props) {
    const [dataGame, setData] = useState(undefined);

    useEffect(() => {
        loadData().then((data) => {
            setData(data.Games)
        })
    }, []);

    let createCommentId = -1

    async function addComment(dataGame, name, comment) {
        const newComment = {
            id: --createCommentId,
            author: {
                name: name,
                avatar: "https://i.pravatar.cc/300?u" + Math.floor(Math.random() * 100),
                id: 3,
            },
            text: comment,
        }
        console.log(newComment)
        try {
            const response = await fetch("http://localhost:3001/api/" + dataGame.id + "/addComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: name, comment: comment}),
            })
            const commentFromServer = await response.json();

            setData((lastGameValue) => ({
                ...lastGameValue,
                comments: lastGameValue.comments.map(c => c.id === newComment.id ? commentFromServer : c)
            }))
        } catch (e) {
            setData((lastGameValue) => ({
                ...lastGameValue,
                comments: dataGame.comments.filter(c => c.id !== newComment.id)
            }))
            console.log(e)
        }
    }

    async function deleteComment(dataGame, name, comment) {
        try {
            await fetch("http://localhost:3001/api/" + dataGame.id + "/deleteComment" + comment.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
        } catch (e) {
            console.log(e)
        }
    }

    async function addNewGame(name, description, releaseDate, developers, typeOfGame, pegi, imageBanner, imageCard, youtubeLink) {
        try {
            const newGame = {
                id: --createCommentId,
                infos: {
                    name: name,
                    description: description,
                    imageCard: imageCard,
                    imageBanner: imageBanner,
                    pegi: pegi,
                    date: releaseDate,
                    developers: developers,
                    type: typeOfGame,
                    youtubeVideoLink: youtubeLink
                },
                comments: []
            }

            const response = await fetch("http://localhost:3001/api/addNewGame", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    imageCard: imageCard,
                    imageBanner: imageBanner,
                    pegi: pegi,
                    date: releaseDate,
                    developers: developers,
                    type: typeOfGame,
                    youtubeVideoLink: youtubeLink
                }),
            })
            const gameFromServer = await response.json();

            setData((lastGameValue) => ({
                ...lastGameValue,
                Games: lastGameValue.Games.map(c => c.id === newGame.id ? gameFromServer : c)
            }))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <dataGameContext.Provider value={{
            dataGame,
            addComment,
            deleteComment,
            addNewGame
        }}>
            {props.children}
        </dataGameContext.Provider>
    );
}