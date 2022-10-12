import React, { useContext } from 'react'
import { Navigate } from "react-router-dom";
import { IdeasList } from "../components/IdeasList.js";
import { UserContext } from "../context/userContext"
import { db } from "../firebase-config.js";
import { setDoc, doc } from "firebase/firestore";

export default function Home() {

    const {currentUser} = useContext(UserContext);

    const [newIdeaName, setNewIdeaName] = React.useState("");
    const [newIdeaDescription, setNewIdeaDescription] = React.useState("");

    const onIdeaNameChange = (e) => {
        setNewIdeaName(e.target.value);
    }

    const onIdeaDescriptionChange = (e) => {
        setNewIdeaDescription(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "city_ideas", newIdeaName), {
                title: newIdeaName,
                description: newIdeaDescription,
                authorId: currentUser.uid,
                author: currentUser.email,
                votes: 0
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    if (currentUser) {
        return <div className={'bg-[#1e1e1e]/95 h-full w-full flex items-center flex-col box-border overflow-auto mt-[80px] p-[20px]'}
                    style={{height: "calc(100vh - 80px)"}}>
            {/*Form to add new idea, title and submit button: */}
            <form className={'flex flex-col mt-[20px] gap-[10px] items-end'} onSubmit={onSubmit}>
                <input className={'w-[300px] h-[40px] bg-black/30 p-3 text-white outline-none'}
                       onChange={onIdeaNameChange}
                       type={'text'}
                       minLength={10}
                       required={true}
                       placeholder={'Pomysł'}/>
                <textarea className={'w-[300px] h-[100px] bg-black/30 p-3 text-white outline-none'}
                            onChange={onIdeaDescriptionChange}
                            minLength={10}
                            required={true}
                            placeholder={'Opis'}/>
                <button className={'w-[100px] bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded'} type={'submit'}>Dodaj</button>
            </form>

            <IdeasList />
        </div>
    }
    else {
        return <Navigate to="/"/>
    }
}