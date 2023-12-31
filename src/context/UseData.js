import {createContext, useContext, useEffect, useState} from "react";
import {useLoaderData} from "react-router-dom";

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
    const [dataGame, setGame] = useState(undefined);

    useEffect(() => {
        loadData().then((data) => {
            setGame(data.Games)
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
            isSending: true,
        }

        setGame({...dataGame, comments: [...dataGame.comments, newComment]})

        try {
            const response = await fetch("http://localhost:3001/api/" + dataGame.id + "/addComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: name, comment: comment}),
            })
            const commentFromServer = await response.json();

            setGame((lastGameValue) => ({
                ...lastGameValue,
                comments: lastGameValue.comments.map(c => c.id === newComment.id ? commentFromServer : c)
            }))
        } catch (e) {
            setGame((lastGameValue) => ({
                ...lastGameValue,
                comments: dataGame.comments.filter(c => c.id !== newComment.id)
            }))
            console.log(e)
        }
    }

    async function deleteComment(dataGame, comment) {
        const oldComments = [...dataGame.comments]
        setGame({...dataGame, comments: dataGame.comments.filter(c => c.id !== comment.id)})

        try {
            await fetch("http://localhost:3001/api/" + dataGame.id + "/deleteComment/" + comment.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
        } catch (e) {
            console.log(e)
            setGame({...dataGame, comments: oldComments})
        }
    }

    async function addNewGame(name, description, releaseDate, developers, typeOfGame, pegi, imageBanner, imageCard, youtubeLink) {
        try {
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
                    youtubeVideoLink: youtubeLink,
                    isSending: true,
                }),
            })
            const newGameFromServer = await response.json();
            console.log(newGameFromServer)
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