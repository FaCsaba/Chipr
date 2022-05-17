
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { collection, DocumentData, documentId, getDocs, onSnapshot, orderBy, query, QueryDocumentSnapshot, SnapshotOptions, Timestamp, where } from 'firebase/firestore';
import { db } from "../firebaseSetup";

export class ChirpUser {
    constructor(public id: string, public amountOfChirps: number, public chirpHandle: string, public chirpIds: string[], public pic: string, public username: string) {}

    async getChirps() {
        // getDoc where /chiprs/${id}/user == this.id
        const q = query(collection(db, 'chirps').withConverter(chirpConverter), where('user', '==', this.id))
        return (await getDocs(q)).docs.map(doc=>{return doc.data()})
    }
}

export class ChirpItem {
    constructor(public id: string, public userId: string, public textcontent: string, public imgcontent: string[], public timestamp: Timestamp) {}

    getUser() {
        // filter downloaded users, or getDoc it
        return
    }
}

export interface ChirpContextI {
    chirps: ChirpItem[] | undefined
    users: ChirpUser[] | undefined
    addChirp: (chirp: ChirpItem) => void
    getUser: (chirpHandle: string) => void
}

export type Users = {[key: string]: ChirpUser}

const ChirpContext = createContext<ChirpContextI>({chirps: [], users: [], addChirp: ()=>{}, getUser: ()=>{}})

export function useChirps() {
    return useContext(ChirpContext)
}


export const chirpConverter = {
    toFirestore: (chirp: ChirpItem): DocumentData => {
        return {
            user: chirp.userId,
            textcontent: chirp.textcontent,
            imgcontent: chirp.imgcontent,
            timestamp: chirp.timestamp
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ChirpItem => {
        const data = snapshot.data(options);
        return new ChirpItem(snapshot.id, data.user, data.textcontent, data.imgcontent, data.timestamp)
    }
}

export const userConverter = {
    toFirestore: (user: ChirpUser): DocumentData => {
        return {
            amountOfChirps: user.amountOfChirps,
            chirpHandle: user.chirpHandle,
            chirps: user.chirpIds,
            pic: user.pic,
            username: user.username
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ChirpUser => {
        const data = snapshot.data(options);
        return new ChirpUser(snapshot.id, data.amountOfChirps, data.chirpHandle, data.chirps, data.pic, data.username)
    }
}


export function ChirpProvider({ children }: {children: JSX.Element} ) {
    const [chirps, setChirps] = useState<ChirpItem[] | undefined>([]);
    const [users, setUsers] = useState<ChirpUser[] | undefined>([]);

    function addChirp(chirp: ChirpItem) {
        if (chirps) {

            setChirps([chirp, ...chirps])
        } else {
            setChirps([chirp])
        }
    }

    const addUser = (user: ChirpUser) => {
        if (users) return setUsers([user, ...users])
        setUsers([user])
    }

    useEffect(()=> {
        const unsubFromChirps = onSnapshot(
            query(collection(db, "chirps")
            .withConverter(chirpConverter), orderBy('timestamp', 'desc')), (value) => {
                console.log(value)
                const _chirps = value.docs.map((u)=>{return u.data()})
                setChirps(_chirps)
            })
        
        const unsubFromUsers = onSnapshot(collection(db, 'users')
                .withConverter(userConverter), (value) => {
                    const _users = value.docs.map(u => {return u.data()})
                    setUsers(_users)
                })
        
        return () => {unsubFromChirps(); unsubFromUsers()}
    }, [])

    

    function getUserByChirpHandle(chirpHandle: string) {
        if (users) {
            const found = users.find((user: ChirpUser | undefined)=>{
                if (!user) return false
                return user.chirpHandle === chirpHandle
            })
            if (found) {return}
        }
        const q = query(collection(db, 'users').withConverter(userConverter), where('chirpHandle', '==', chirpHandle))
        getDocs(q).then( value => {
            const _users = value.docs.map(doc => {return doc.data()})
            
            addUser(_users[0])
        })
    }


    const value: ChirpContextI = {
        chirps,
        users,
        addChirp,
        getUser: getUserByChirpHandle
    }

    return <>
{         <ChirpContext.Provider value={value}>
            {children}
        </ChirpContext.Provider> }
    </>
}

export default ChirpContext