
import { createContext, useContext, useState, useEffect } from "react";
import { collection, deleteDoc, DocumentData, getDocs, onSnapshot, orderBy, query, QueryDocumentSnapshot, SnapshotOptions, Timestamp, where, doc } from 'firebase/firestore';
import { db } from "../firebaseSetup";

export class ChirpUser {
    constructor(public id: string, public amountOfChirps: number, public chirpHandle: string, public chirpIds: string[], public pic: string, public username: string, public createdAt: Timestamp, public blurb: string) {}

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
    getUserByChirpHandle?: (chirpHandle: string) => Promise<ChirpUser|undefined>
    deleteChirp: (chirpId: string) => void
}

export type Users = {[key: string]: ChirpUser}

const ChirpContext = createContext<ChirpContextI>({chirps: [], users: [], addChirp: ()=>{}, deleteChirp: ()=>{}})

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
        return new ChirpUser(snapshot.id, data.amountOfChirps, data.chirpHandle, data.chirps, data.pic, data.username, data.createdAt, data.blurb)
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

    

    async function getUserByChirpHandle(chirpHandle: string) {
        if (users) {
            const found = users.find((user: ChirpUser | undefined)=>{
                if (!user) return false
                return user.chirpHandle === chirpHandle
            })
            if (found) {return found}
        }

        const q = query(collection(db, 'users').withConverter(userConverter), where('chirpHandle', '==', chirpHandle))
        const value = await getDocs(q)
        const _users = value.docs.map(doc => {return doc.data()})
        if (_users) {
            addUser(_users[0])
        }
        return users?.filter(u=>{return u.chirpHandle === chirpHandle})[0]
    }

    function deleteChirp(chirpId: string) {
        deleteDoc(doc(collection(db, 'chirps'), chirpId))
            .then(()=>console.log('deleted chirp'))
            .catch((reason)=> console.log(reason))
    }


    const value: ChirpContextI = {
        chirps,
        users,
        addChirp,
        getUserByChirpHandle: getUserByChirpHandle,
        deleteChirp
    }

    return <>
{         <ChirpContext.Provider value={value}>
            {children}
        </ChirpContext.Provider> }
    </>
}

export default ChirpContext