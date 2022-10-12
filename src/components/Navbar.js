import { signOut } from "firebase/auth"
import React, { useContext, useMemo } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { auth } from "../firebase-config"

export default function Navbar() {

    const {currentUser} = useContext(UserContext)

    const navigate = useNavigate()

    const logOut = async () => {
        try {
            await signOut(auth)
            navigate("/")
        }
        catch {
            alert("For some reasons we can't sign out, please check your internet connexion and retry.")
        }
    }

    const logOutButton = useMemo(() => {
        if (currentUser) {
            return <button
                onClick={logOut}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                Wyloguj się
            </button>
        }
    }, [currentUser]);

    const logInButton = useMemo(() => {
        if (!currentUser) {
            return <Link to={'/logowanie'}>
                <button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Zaloguj się
                </button>
            </Link>
        }
    } , [currentUser]);

    const signUpButton = useMemo(() => {
        if (!currentUser) {
            return <Link to={'/rejestracja'}>
                <button
                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                    Zarejestruj się
                </button>
            </Link>
        }
    }, [currentUser]);

    const currentUserEmail = useMemo(() => {
        if (currentUser) {
            return <div className="text-white hidden md:block">{currentUser.email}</div>
        }
    }, [currentUser]);

    return <nav className="fixed top-0 left-0 flex sm:flex-row sm:text-left justify-around py-4 px-6 bg-neutral-800  w-full">
        <Link to={currentUser ? "/home" : "/"} className="text-2xl font-bold text-white no-underline hover:no-underline leading-loose">
            <div>HackHeroes</div>
        </Link>

        <div className={"flex flex-row items-center justify-center"}>
            <div className="flex items-center justify-center gap-4 text-white-50">
                {currentUserEmail}
                {logInButton}
                {logOutButton}
                {signUpButton}
            </div>
        </div>
    </nav>
}