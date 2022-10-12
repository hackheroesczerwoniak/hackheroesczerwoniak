import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm.js";
import { UserContext } from "../context/userContext"

export default function MainPage() {

    const {signIn, currentUser} = useContext(UserContext);

    const [signInError, setSignInError] = React.useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/home")
        }
    }, [currentUser]);

    const onSignIn = useCallback(async (email, password) => {
        try {
            await signIn(email, password)
            navigate("/")
        }
        catch (err) {
            setSignInError(err.code)
        }
    }, []);

    return <div className="w-full h-full flex justify-center items-center">
        <LoginForm onSubmit={onSignIn} error={signInError} />
    </div>
}