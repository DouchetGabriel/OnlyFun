import React, {useReducer} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

import VideoGamePresentation/*, {
    loader as VideoGamePresentationLoader,
}*/ from "./routes/VideoGamePresentation";

import UseData, {
    loader as VideoGamePresentationLoader,
} from "./context/UseData";

import ErrorPage from "./ErrorPage";
import MainPage from "./routes/MainPage";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import CreateGame from "./routes/CreateGame";
import LoginPage from "./routes/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/CreateGame",
        element: <CreateGame/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/MainPage",
        element: <MainPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/VideoGamePresentation/:id",
        element: <VideoGamePresentation/>,
        loader: VideoGamePresentationLoader,
        errorElement: <ErrorPage/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
);

//const root = ReactDOM.createRoot(document.getElementById('root'));

/*root.render(
  <React.StrictMode>
    <VideoGamePresentation/>
  </React.StrictMode>
);*/

reportWebVitals();
