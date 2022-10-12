import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { CityIdea } from "../components/CityIdea.js";
import { db } from "../firebase-config.js";

export const IdeasList = () => {

    const [ideas, setIdeas] = React.useState({});

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

    return <div className={'h-full'}>
        <h1 className={'text-2xl text-white font-medium font-sans mt-[20px]'}>Pomysły na usprawnienie miasta</h1>
        <div className={'flex flex-col gap-[20px] max-h-[400px] overflow-auto'}>
            {
                Object.keys(ideas).map((key) => {
                    return <CityIdea key={key} idea={ideas[key]} id={key}/>
                })
            }
        </div>
    </div>
}