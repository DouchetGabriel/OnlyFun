import {Link, useNavigate} from "react-router-dom";
import React, {useRef} from "react";
import {UserProvider, useUser} from "../context/UseUser";
import {TokenProvider, useToken} from "../context/useToken";

function TitleBannerComponent() {
    return (
        <h1 className="mb-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Welcome on Only
            <mark
                className="px-2 text-white bg-blue-600 items-center text-center rounded dark:bg-blue-500"> Fun </mark>
        </h1>
    )
}

function LoginFormComponent() {
    const {checkLogin} = useUser()
    const {setToken} = useToken()

    const userNameInput = useRef()
    const passwordInput = useRef()

    const navigate = useNavigate()

    async function onSubmit(event) {
        event.preventDefault()

        const username = userNameInput.current.value
        const password = passwordInput.current.value

        if(username === undefined || password === undefined || username === "" || password === "") {
            return
        } else {
            const token = await checkLogin(username, password)
            console.log('User found !')
            console.log('user & token => ', token)
            setToken(token)
            navigate("/MainPage")
        }
    }

    return (
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div
                className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
            </div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                    <div>
                        <h1 className="text-2xl font-semibold"> Enter your informations < /h1>
                    </div>
                    <div className="divide-y divide-gray-200">
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div className="relative">
                                <input autoComplete="off"
                                       ref={userNameInput}
                                       type="text"
                                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                       placeholder="Username"
                                       required/>
                                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"> Username
                                </label>
                            </div>
                            <div className="relative">
                                <input autoComplete="off"
                                       ref={passwordInput}
                                       type="password"
                                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                       placeholder="Password"
                                       required/>
                                <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                            </div>
                            <div className="relative">
                                <Link
                                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                                    type="submit"
                                    onClick={onSubmit}
                                    to={"/MainPage"}> Submit </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LoginPage() {
    return (
        <div className={"dark:bg-gray-900 min-h-screen py-6 flex flex-col justify-center sm:py-12"}>
            <header>
                <TitleBannerComponent/>
            </header>

            <LoginFormComponent/>
        </div>
    )
}

function LoginPageWrapper() {
    return (
        <TokenProvider>
            <UserProvider>
                <LoginPage/>
            </UserProvider>
        </TokenProvider>
    )
}

export default LoginPageWrapper;