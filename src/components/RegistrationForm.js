import React from "react";
import { Link } from "react-router-dom";

export const RegistrationForm = (props) => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(email, password);
    }

    return <form className="w-[400px] bg-[#232323] px-8 pt-6 pb-8 flex flex-col gap-4 border-b-4 border-[#3e3e3e]"
                 onSubmit={handleSubmit}>
        <div className="flex flex-col w-full justify-center items-center font-bold text-white text-2xl">
            <div>Rejestracja</div>
        </div>

        <div className="mb-4">
            <input
                className="shadow bg-[#3a3a3a] mt-2 border-none w-full py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                id="email"
                type="email"
                autoComplete={"email"}
                placeholder="Adres e-mail"
                required={true}
                value={email} onChange={handleEmailChange}/>
            {props.error === "auth/invalid-email" && <div className="mt-3 text-red-500">To pole jest wymagane</div>}
            {props.error === "auth/email-already-in-use" && <div className="mt-3 text-red-500">Ten adres e-mail jest już zajęty</div>}
        </div>

        <div className="mb-6">
            <input
                className="shadow bg-[#3a3a3a] mt-2 border-none w-full py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                id="password"
                autoComplete="new-password"
                type="password"
                required={true}
                placeholder="Hasło" onChange={handlePasswordChange}/>
            {props.error === "auth/wrong-password" && <div className="mt-3 text-red-500">Hasło nieprawidłowe</div>}
            {props.error === "auth/empty-password" && <div className="mt-3 text-red-500">To pole jest wymagane</div>}
            {props.error === "auth/weak-password" && <div className="mt-3 text-red-500">Hasło jest zbyt słabe</div>}
        </div>
        <div className="flex items-center justify-between">
            <Link className="text-white underline" to="/logowanie">Powrót do logowania</Link>
            <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                type="submit">
                Utwórz konto
            </button>
        </div>
    </form>
}