import React from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';


interface IAmazonContext {
  isAuthenticated: boolean,
  setNickname: () => void;
  setUsername: () => void;
  username: string;
  nickname: string;
  assets: any[];
}

export const AmazonContext = React.createContext<IAmazonContext | null>(null);

export const AmazonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = React.useState<string>('')
  const [nickname, setNickname] = React.useState<string>('');
  const [assets, setAssets] = React.useState<any[]>([])
  const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
  } = useMoralis()

  const {
    data: assetsData,
    error: assetsDataError,
    isLoading: useDataisLoading,
  } = useMoralisQuery('assets')



  React.useEffect(() => {
    (async() => {
      if (isAuthenticated) {
        const currentUsername: string = await user?.get('nickname');
        setUsername(currentUsername);
      }
    })()
  }, [isAuthenticated, user, username])

  const getAssets = async () => {
    try {
      await enableWeb3();
      setAssets(assetsData);

    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {(
    (async() => {
      if (isWeb3Enabled) {
        await getAssets();
      }
    })())
  },[getAssets, isWeb3Enabled])


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
    // @ts-ignore
    <AmazonContext className="Provider" value={{
      isAuthenticated,
      setNickname,
      setUsername,
      username,
      nickname,
      assets,
    }}>
      {children}
    </AmazonContext>
  )
}
