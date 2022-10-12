import React, { useContext, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { CityIdea } from "../components/CityIdea";
import { UserContext } from "../context/userContext"
import { db } from "../firebase-config.js";
import { collection,  setDoc, onSnapshot, query, doc } from "firebase/firestore";

export default function Home() {

    const {currentUser} = useContext(UserContext);

    const [ideas, setIdeas] = React.useState({});

    const [newIdeaName, setNewIdeaName] = React.useState("");
    const [newIdeaDescription, setNewIdeaDescription] = React.useState("");

    useEffect(() => {
        const q = query(collection(db, "city_ideas"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setIdeas(prev => ({...prev, [doc.id]: doc.data()}))
            });
        });

        return () => {
            unsubscribe();
        }
    }, []);

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
        return <div className={'h-full w-full flex items-center flex-col box-border pt-[100px]'}>
            <img src={'https://media.tenor.com/cIUjlvgnFRgAAAAM/dog-snoop.gif'} width={200} alt={'dog'}/>
            <div className={'text-3xl text-white font-bold font-sans mt-[20px]'}>Cześć</div>
            <div className={'text-1xl text-white font-bold font-sans mt-[20px]'}>{currentUser.email}</div>
            {/*Form to add new idea, title and submit button: */}
            <h1 className={'text-3xl text-white font-bold font-sans mt-[20px] mt-[100px]'}>Pomysły na usprawnienie miasta</h1>
            <form className={'flex flex-col mt-[20px] gap-[10px] items-end'} onSubmit={onSubmit}>
                <input className={'w-[300px] h-[40px] bg-black/30 p-3 text-white bg-transparent outline-none'}
                       onChange={onIdeaNameChange}
                       type={'text'}
                       minLength={10}
                       required={true}
                       placeholder={'Pomysł'}/>
                <textarea className={'w-[300px] h-[100px] bg-black/30 p-3 text-white bg-transparent outline-none'}
                            onChange={onIdeaDescriptionChange}
                            minLength={10}
                            required={true}
                            placeholder={'Opis'}/>
                <button className={'w-[100px] bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-4 border-emerald-700 hover:border-emerald-500 rounded'} type={'submit'}>Dodaj</button>
            </form>

            <div className={'text-1xl text-white font-bold font-sans mt-[100px]'}>{
                Object.keys(ideas).map((key) => {
                    return <CityIdea key={key} idea={ideas[key]} id={key}/>
                })
            }</div>
        </div>
    }
    else {
        return <Navigate to="/"/>
    }
}