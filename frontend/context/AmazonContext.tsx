import React, { ReactElement } from 'react';


interface IAmazonContext {
oleh: number
}
export const AmazonContext = React.createContext<IAmazonContext | null>(null);

export const AmazonProvider:React.FC<{ children: React.ReactNode }> = ({ children }) => {


  return (
    <AmazonContext className="Provider" value={{

    }}>
      {children}
    </AmazonContext>
  )
}
