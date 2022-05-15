import React, {useContext, useState, useEffect} from 'react';
import { auth, db } from '../firebaseSetup';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp, collection } from 'firebase/firestore';
import { ChirpUser, userConverter, ChirpItem, useChirps, chirpConverter } from './ChirpProvider';

interface CurrentUserI {
    auth: User|null,  
    chirprInfo: ChirpUser|undefined 
}


interface AuthContextI {
    isLoadingCurrentUser: boolean,
    currentUser?: CurrentUserI,
    login?: (email: string, password: string, successCallback: (user: User) => void, failCallback: (reason: any) => void) => void
    logout?: () => void
    register?: (email: string, password: string, successCallback: (user: User) => string, failCallback: (reason: any) => void) => void,
    sendChirp?: (chirpMessage: string) => void 
}

const AuthContext = React.createContext<AuthContextI>({isLoadingCurrentUser: true})

export function useAuth() {
    return useContext(AuthContext)
}

function cleanErrorReason(reason: string) {
    return reason.split('/')[1]
}

export default function AuthProvider({children}: {children: JSX.Element}) {
    const [currentUser, setCurrentUser] = useState<CurrentUserI|undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {addChirp} = useChirps()

    function register(email: string, password: string, successCallback: (user: User) => string, failCallback: (reason: any) => void) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((user)=> {
                console.log(user)
                const chirpHandle = successCallback(user.user)
                return setDoc(doc(db, 'users', user.user.uid), {amountOfChirps: 0, chirpHandle, chirps: [], pic: user.user.photoURL || 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg', username: chirpHandle})
            }, (reason)=>{
                console.log(reason.code)
                failCallback(cleanErrorReason(reason.code))
            })
            .catch((reason)=>{
                console.log(JSON.stringify(reason))
            })
    }

    function login(email: string, password: string, successCallback: (user: User) => void, failCallback: (reason: any) => void) {
        signInWithEmailAndPassword(auth, email, password)
            .then((user)=>{
                console.log(user)
                successCallback(user.user)
            })
            .catch((reason)=>{
                console.log(reason.code)
                failCallback(cleanErrorReason(reason.code))
        
            })
    }

    function logout() {
        signOut(auth)
    }

    function sendChirp(chirpMessage: string) {
        if (currentUser?.chirprInfo) {
            const chirp = new ChirpItem('', currentUser.chirprInfo.id, chirpMessage, [], Timestamp.now()) 
            setDoc(doc(collection(db, 'chirps')).withConverter(chirpConverter), chirp)
                .then(()=>{
                    addChirp(chirp)
                })
        }
    }

    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((user: User | null) => {
            if (user) {
                setIsLoading(false)
                return getDoc(doc(db, 'users', user.uid ).withConverter(userConverter)).then((chirprUser)=>{setCurrentUser({auth: user, chirprInfo: chirprUser.data()})})}
            else setCurrentUser({auth: user, chirprInfo: undefined})
            return setIsLoading(false)
        })

        return unsub
    }, [])


    const value: AuthContextI = {
        currentUser,
        register,
        login,
        logout,
        isLoadingCurrentUser: isLoading,
        sendChirp
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
