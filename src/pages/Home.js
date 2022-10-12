import React, { useContext } from 'react'
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext"
export default function Home() {

    const {currentUser} = useContext(UserContext);

    if (currentUser) {
        return <div className={'h-full w-full flex items-center flex-col box-border pt-[100px]'}>
            <img src={'https://media.tenor.com/cIUjlvgnFRgAAAAM/dog-snoop.gif'} width={200} alt={'dog'}/>
            <div className={'text-3xl text-white font-bold font-sans mt-[20px]'}>Cześć</div>
            <div className={'text-1xl text-white font-bold font-sans mt-[20px]'}>{currentUser.email}</div>
        </div>
    }
    else {
        return <Navigate to="/" />
    }
}