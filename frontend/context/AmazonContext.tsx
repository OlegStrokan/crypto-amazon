import React from 'react';
import { useMoralis } from 'react-moralis';


interface IAmazonContext {
oleh: number
}
export const AmazonContext = React.createContext<IAmazonContext | null>(null);

export const AmazonProvider:React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = React.useState<string>('')
  const [nickname, setNickname] = React.useState<string>('');

  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
  } = useMoralis()

  return (
    <AmazonContext className="Provider" value={{

    }}>
      {children}
    </AmazonContext>
  )
}
