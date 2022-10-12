import React, { useCallback, useContext } from 'react'
import { RegistrationForm } from "../components/RegistrationForm.js";
import { UserContext } from "../context/userContext"

export default function RegistrationPage() {

    const {signUp, currentUser} = useContext(UserContext);

    const [err, setErr] = React.useState("");

    const onRegister = useCallback(async (email, password) => {
        try {
            await signUp(email, password)
            setErr("");
        }
        catch (err) {
            setErr(err.code)
        }
    }, [signUp]);

    if (currentUser) {
        return <div className="text-white">Welcome {currentUser.email}</div>
    }
    else {
        return <div className="w-full h-full flex justify-center items-center">
            <RegistrationForm onSubmit={onRegister} error={err} />
        </div>
    }
}