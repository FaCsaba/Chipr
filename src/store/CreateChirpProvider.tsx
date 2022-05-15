import { useState, useContext } from 'react';
import React from 'react';


interface CreateChirpI {
    toggleCreation: () => void
    isCreating: boolean
}

const CreateChirpContext = React.createContext<CreateChirpI>({toggleCreation: ()=>{}, isCreating: false})

export function useCreateChirp() {
    return useContext(CreateChirpContext)
}

function CreateChirpProvider({children}: {children: JSX.Element}) {
    const [isCreating, setIsCreating] = useState<boolean>(false)

    function toggleCreation() {
        setIsCreating(!isCreating)
    }

    const value: CreateChirpI = {
        isCreating,
        toggleCreation
    }

    return (
        <CreateChirpContext.Provider value={value}>
            {children}
        </CreateChirpContext.Provider>
    )
}

export default CreateChirpProvider