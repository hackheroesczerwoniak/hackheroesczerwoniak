import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase-config"

export const UserContext = createContext()

export function UserContextProvider(props) {

    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)

    const [currentUser, setCurrentUser] = useState();
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoadingData(false)
        })

        return unsubscribe;
    }, [])


    return <UserContext.Provider value={{signIn, signUp, currentUser }}>
        {!loadingData && props.children}
    </UserContext.Provider>
}