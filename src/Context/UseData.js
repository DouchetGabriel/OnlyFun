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

export async function loader ({ params }) {
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

    return (
        <dataGameContext.Provider value={{
            dataGame,
        }}>
            {props.children}
        </dataGameContext.Provider>
    );
}