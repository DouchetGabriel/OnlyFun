import {createContext, useContext, useState} from "react";

const userContext = createContext(null)

export function useUser() {
    return useContext(userContext)
}

// Provider
export function UserProvider(props) {
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState(undefined);

    async function checkLogin(userName, password) {
        const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userName: userName, password: password}),
        })
        const userFromServer = await response.json();

        if(userFromServer.error !== undefined) {
            console.log(userFromServer.error)
        } else {
            console.log("User found !")
            setUser(userFromServer.name)
            console.log(user)
        }
    }


    return (
        <userContext.Provider value={{
            user,
            token,
            checkLogin,
        }}>
            {props.children}
        </userContext.Provider>
    )
}