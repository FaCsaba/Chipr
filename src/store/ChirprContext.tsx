import React, { createContext, useEffect, useState } from "react";
import { User, ChirpItem } from '../components/components';

export interface ChirprContextI {
    loggedInUser?: User
    chirps?: Chirps
    users?: Users
    isLoggedIn?: boolean,
    loadingChirps: boolean
}

export type Chirps = {[key: string]: ChirpItem}
export type Users = {[key: string]: User}


const ChirprContext = createContext<ChirprContextI>({loadingChirps: true})

export function ChirprProvider({ children }: {children: JSX.Element} ) {
    const [chirps, setChirps] = useState<Chirps>({});
    const [users, setUsers] = useState<Users>({});

    const isLoggedIn = false
    

    // THIS IS NOT SCALABLE!! I am just using serverless to showcase Chirp functionality

    const getUsers = () => {
        
        fetch('https://chirpr-758b8-default-rtdb.firebaseio.com/users.json')
        .then(res => {return res.json()})
        .then(res => {
            setUsers(res)
        })
    }

    const getChirps = () => {
        fetch('https://chirpr-758b8-default-rtdb.firebaseio.com/chirps.json')
            .then(res => {return res.json()})
            .then(res => setChirps(res))
    }

    useEffect(() => {
        getChirps();
        getUsers()
    }, [])
    

    return <>
        <ChirprContext.Provider value={{chirps, users, isLoggedIn, loadingChirps: true}}>
            {children}
        </ChirprContext.Provider>
    </>
}

export default ChirprContext