import {createContext, useContext, useState} from "react";

const userContext = createContext(null)

export function useUser() {
    return useContext(userContext)
}

// Provider
export function UserProvider(props) {
    const [user, setUser] = useState(undefined);

    async function checkLogin(username, password) {
        const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: username, password: password}),
        })
        const reponseFromServer = await response.json();

        if(reponseFromServer.error !== undefined) {
            console.log(reponseFromServer.error)
        } else {
            console.log("User found !")
            setUser(reponseFromServer)
            console.log('user => ', user)
            return reponseFromServer
        }
    }

    return (
        <userContext.Provider value={{
            user,
            checkLogin,
        }}>
            {props.children}
        </userContext.Provider>
    )
}