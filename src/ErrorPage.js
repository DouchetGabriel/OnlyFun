import {Link, useRouteError} from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="App">
            <header className="App-header">
                <h1 className="pb-5">Oops!</h1>
                <p className="pb-5">Sorry, an unexpected error has occurred.</p>
                <p className="pb-5">
                    <i>{error.statusText || error.message}</i>
                </p>
                <p>
                    <Link to="/"
                          className="select-none rounded-lg bg-amber-50 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-black transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Return to the homepage
                    </Link>
                </p>
            </header>
        </div>
    )
}

export default ErrorPage;