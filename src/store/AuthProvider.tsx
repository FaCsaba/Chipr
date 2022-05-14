import React, {useContext, useState, useEffect} from 'react';
import { auth } from '../firebaseSetup';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User, UserCredential } from 'firebase/auth';

interface AuthContextI {
    isLoadingCurrentUser: boolean,
    currentUser?: User | null, 
    login?: (email: string, password: string) => Promise<UserCredential>
    register?: (email: string, password: string) => Promise<UserCredential>
}

const AuthContext = React.createContext<AuthContextI>({isLoadingCurrentUser: true})

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({children}: {children: JSX.Element}) {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    function register(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((user: User | null) => {
            setCurrentUser(user)
            setIsLoading(false)
        })

        return unsub
    }, [])


    const value: AuthContextI = {
        currentUser,
        register,
        login,
        isLoadingCurrentUser: isLoading
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
