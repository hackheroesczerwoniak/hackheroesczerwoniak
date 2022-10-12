import React, { useContext, useEffect, useMemo } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { IdeasList } from "../components/IdeasList.js";
import { UserContext } from "../context/userContext"

export default function MainPage() {

    const {currentUser} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/home")
        }
    }, [currentUser, navigate]);

    const logInButton = useMemo(() => {
        if (!currentUser) {
            return <Link to={'/logowanie'} className="w-full">
                <button
                    className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Zaloguj się
                </button>
            </Link>
        }
    }, [currentUser]);

    const signUpButton = useMemo(() => {
        if (!currentUser) {
            return <Link to={'/rejestracja'} className="w-full">
                <button
                    className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                    Zarejestruj się
                </button>
            </Link>
        }
    }, [currentUser]);


    return <div className="w-full h-full flex justify-center items-center bg-green-500/10 bg-green-500/10 p-[10px] ">
        {/*White title*/}
        <div className="w-full flex flex-col justify-center items-center">
            <div className="text-2xl font-bold font-serif text-white text-center">
                Nowy lepszy Żyrardów
            </div>

            <div className="text-sm font-sans text-white text-center mt-4 mb-4">
                Dodawaj nowe pomysły jak ulepszyć nasze miasto i głosuj na te, które uważasz za najlepsze.
            </div>

            <div className="flex justify-center items-center gap-4 mt-4 flex-col md:flex-row w-[200px] md:w-[400px]">
                {logInButton}
                {signUpButton}
            </div>
        </div>
    </div>;
}