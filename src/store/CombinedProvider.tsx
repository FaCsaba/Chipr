import React from 'react'
import AuthProvider from './AuthProvider'
import { ChirpProvider } from './ChirpProvider'
import CreateChirpProvider from './CreateChirpProvider'

function CombinedProvider({children}: {children: JSX.Element}) {
  return (
    <ChirpProvider>
        <AuthProvider>
            <CreateChirpProvider>
                    {children}
            </CreateChirpProvider>
        </AuthProvider>
    </ChirpProvider>
  )
}

export default CombinedProvider