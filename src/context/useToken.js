import {createContext, useContext, useState} from "react";

const tokenContext = createContext(null);

export function useToken() {
    return useContext(tokenContext);
}

export function TokenProvider(props) {
    const storageKey = 'token'

    const getToken = () => {
        const tokenString = localStorage.getItem(storageKey);
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    }

    const saveToken = (userToken) => {
        localStorage.setItem(storageKey, JSON.stringify(userToken));
        setToken(userToken.token);
    }

    const clearToken = () => {
        localStorage.removeItem(storageKey);
        setToken(null);
    };

    const [token, setToken] = useState(getToken())

    return (
        <tokenContext.Provider value={{
            token,
            setToken: saveToken,
            clearToken,
        }}>
            {props.children}
        </tokenContext.Provider>
    )
}