import React from 'react';
import { useMoralis } from 'react-moralis';


interface IAmazonContext {
  isAuthenticated: boolean,
  setNickname: () => void;
  setUsername: () => void;
  username: string;
  nickname: string;
}

export const AmazonContext = React.createContext<IAmazonContext | null>(null);

export const AmazonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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


  React.useEffect(() => {
    (async() => {
      if (isAuthenticated) {
        const currentUsername: string = await user?.get('nickname');
        setUsername(currentUsername);
      }
    })()
  }, [isAuthenticated, user, username])

  const handleSetUsername = () => {
    if (user) {
      if (nickname) {
        user.set('nickname', nickname);
        user.save();
        setNickname('');
      } else {
        console.log('Can\'t set empty nickname');
      }
    }
  }


  return (
    <AmazonContext className="Provider" value={{
      isAuthenticated,
      setNickname,
      setUsername,
      username,
      nickname
    }}>
      {children}
    </AmazonContext>
  )
}
