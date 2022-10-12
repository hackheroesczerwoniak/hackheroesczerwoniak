import React, { useCallback, useContext, useMemo } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm.js";
import { UserContext } from "../context/userContext"

export default function LoginPage() {

    const {signIn, currentUser} = useContext(UserContext);

    const [signInError, setSignInError] = React.useState("");

    const navigate = useNavigate();

    const onSignIn = useCallback(async (email, password) => {
        try {
            await signIn(email, password)
            navigate("/")
        }
        catch (err) {
            setSignInError(err.code)
        }
    }, []);

    if (currentUser) {
        return <div className="text-white">Welcome {currentUser.email}</div>
    }
    else {
        return <div className="w-full h-full flex justify-center items-center">
            <LoginForm onSubmit={onSignIn} error={signInError} />
        </div>
    }
}