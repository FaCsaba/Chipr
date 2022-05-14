import React from 'react'
import AuthProvider from './AuthProvider'
import { ChirpProvider } from './ChirpProvider'

function CombinedProvider({children}: {children: JSX.Element}) {
  return (
    <AuthProvider>
      <ChirpProvider>
        {children}
      </ChirpProvider>
    </AuthProvider>
  )
}

export default CombinedProvider