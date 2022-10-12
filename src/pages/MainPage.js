import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
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

    return <div className="w-full h-full flex justify-center items-center"/>;
}