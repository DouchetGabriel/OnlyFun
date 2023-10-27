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

    async function addComment(name, comment) {
        const newComment = {
            id: --createCommentId,
            author: {
                name: name,
                avatar: "https://i.pravatar.cc/300",
                id: --createCommentId,
            },
            text: comment,
        }
        console.log(newComment)
        try {
            const response = await fetch("http://localhost:3001/api/" + dataGame.id, + "/addComment", {
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
            //setData((lastGameValue) => ({...lastGameValue, comments: dataGame.comments.filter(c => c.id !== newComment.id)}))
            console.log(e)
        }
    }

    return (
        <dataGameContext.Provider value={{
            dataGame,
            addComment,
        }}>
            {props.children}
        </dataGameContext.Provider>
    );
}