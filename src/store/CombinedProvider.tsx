import React from 'react'
import AuthProvider from './AuthProvider'
import { ChirprProvider } from './ChirprContext'

function CombinedProvider({children}: {children: JSX.Element}) {
  return (
    <AuthProvider>
      <ChirprProvider>
        {children}
      </ChirprProvider>
    </AuthProvider>
  )
}

export default CombinedProvider