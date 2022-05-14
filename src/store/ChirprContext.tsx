import { collection, getDocs, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { User, ChirpItem } from '../components/components';
import { db } from '../firebaseSetup';


interface UserWithAuth extends User {
    auth?: string
}

export interface ChirprContextI {
    loggedInUser?: UserWithAuth 
    chirps?: ChirpItem[]
    users?: Users
    isLoggedIn?: boolean,
    setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>
    setLoggedInUser?: React.Dispatch<React.SetStateAction<UserWithAuth>>
}

export type Users = {[key: string]: User}

const postsDBRef = collection(db, 'chirps');

const ChirprContext = createContext<ChirprContextI>({})

export function ChirprProvider({ children }: {children: JSX.Element} ) {

    const [chirps, setChirps] = useState<ChirpItem[]>([]);
    const [users, setUsers] = useState<Users>({});
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<UserWithAuth>({});

    const getChirps = () => {
        getDocs(postsDBRef).then(snap=>{

            let _chirps = (snap.docs.map((doc)=>{return doc.data()}))
            _chirps = _chirps.map((chirp, id) => {chirp.id = id; return chirp})
            let usersRef = _chirps.map(chirp => {return chirp.user})
            _chirps.forEach(chirp=>{setChirps((old => [...old, (chirp as ChirpItem)] as ChirpItem[]))})
            usersRef.forEach( userRef => { getDoc(userRef).then(snap=>{
                console.log(snap.data())
            }) })
        })
    }

    useEffect(() => {
        getChirps()
    }, [])
    

    return <>
        <ChirprContext.Provider value={{chirps, users, isLoggedIn, loggedInUser, setLoggedIn, setLoggedInUser}}>
            {children}
        </ChirprContext.Provider>
    </>
}

export default ChirprContext