
import { createContext, useContext, useState, useEffect } from "react";
import { collection, DocumentData, documentId, getDocs, onSnapshot, orderBy, query, QueryDocumentSnapshot, SnapshotOptions, Timestamp, where } from 'firebase/firestore';
import { db } from "../firebaseSetup";

export class ChirpUser {
    constructor(public id: string, public amountOfChirps: number, public chirpHandle: string, public chirpIds: string[], public pic: string, public username: string) {}

    getChirps() {
        // getDoc where /chiprs/${id}/user == this.id
        return
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
    chirps: ChirpItem[]
    users: ChirpUser[]
    addChirp: (chirp: ChirpItem) => void
}

export type Users = {[key: string]: ChirpUser}

const ChirpContext = createContext<ChirpContextI>({chirps: [], users: [], addChirp: ()=>{}})

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
    const [chirps, setChirps] = useState<ChirpItem[]>([]);
    const [users, setUsers] = useState<ChirpUser[]>([]);

    function addChirp(chirp: ChirpItem) {
        setChirps([chirp, ...chirps])
    }

    useEffect(()=> {
        const unsub = onSnapshot(
            query(collection(db, "chirps")
            .withConverter(chirpConverter), orderBy('timestamp', 'desc')), (value) => {
                console.log(value)
                const _chirps = value.docs.map((q)=>{return q.data()})
                setChirps(_chirps)
                const userIds = _chirps.map(_chirp=>{return _chirp.userId})
                const q = query(collection(db, 'users').withConverter(userConverter), where(documentId(), 'in', userIds))
                                
                getDocs(q).then( value => {
                    const _users = value.docs.map(q=>{return q.data()})
                    setUsers(_users)
                })
            })
        
        return unsub
    }, [])

    const value: ChirpContextI = {
        chirps,
        users,
        addChirp
    }

    return <>
{         <ChirpContext.Provider value={value}>
            {children}
        </ChirpContext.Provider> }
    </>
}

export default ChirpContext