import {createContext, useContext, useState} from "react";

const userContext = createContext(null)

export function useUser() {
    return useContext(userContext)
}

// Provider
export function UserProvider(props) {
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState(undefined);


    return (
        <userContext.Provider value={{
            user,
            token,
        }}>
            {props.children}
        </userContext.Provider>
    )
}