import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';

import VideoGamePresentation/*, {
    loader as VideoGamePresentationLoader,
}*/ from "./routes/VideoGamePresentation";

import UseData, {
    loader as VideoGamePresentationLoader,
} from "./Context/UseData";

import ErrorPage from "./ErrorPage";
import MainPage from "./routes/MainPage";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import CreateGame from "./routes/CreateGame";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/VideoGamePresentation/:id",
        element: <VideoGamePresentation/>,
        loader: VideoGamePresentationLoader,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/CreateGame",
        element: <CreateGame/>,
        errorElement: <ErrorPage/>,
    }
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
