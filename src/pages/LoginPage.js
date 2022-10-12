import React, { useCallback, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm.js";
import { UserContext } from "../context/userContext"

export default function LoginPage() {

    const {signIn, currentUser} = useContext(UserContext);

    const [signInError, setSignInError] = React.useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/home")
        }
    }, [currentUser, navigate]);

    const onSignIn = useCallback(async (email, password) => {
        try {
            await signIn(email, password)
        }
        catch (err) {
            setSignInError(err.code)
        }
    }, []);

    return <div className="w-full h-full flex justify-center items-center bg-green-500/10 bg-green-500/10 p-[10px]">
        <LoginForm onSubmit={onSignIn} error={signInError} />
    </div>
}