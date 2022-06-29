import React from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import {amazonCoinAddress, amazonABI } from '../lib/constants';
import { ethers } from 'ethers'

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
  const [assets, setAssets] = React.useState<any[]>([]);
  const [currentAccount, setCurrentAccount] = React.useState<string>('');
  const [tokenAmount, setTokenAmount] = React.useState<string>('');
  const [amountDue, setAmountDue] = React.useState<string>('');
  const [etherscanLink, setEtherscanLink] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<string>('');
  const [balance, setBalance] = React.useState<string>('');
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


  const getBalance = async () => {
    try {
      if (!isAuthenticated || !currentAccount) return;

      const options = {
        contractAddress: amazonCoinAddress,
        functionName: 'balanceOf',
        abi: amazonABI,
        params: {
          account: currentAccount,
        }
      }

      if (isWeb3Enabled) {
        const response = await Moralis.executeFunction(options);
        setBalance(response.toString());
      }
    } catch (error) {
      console.log(error)
    }
  }

  const buyTokens = async () => {
    if (!isAuthenticated) {
      await authenticate();
    }
  }

  const amount = ethers.BigNumber.from(tokenAmount);
  const price = ethers.BigNumber.from('100000000000000');
  const calcPrice = amount.mul(price);

  let options = {
    contractAddress: amazonCoinAddress,
    functionName: 'mint',
    abi: amazonABI,
    msgValue: calcPrice,
    params: {
      amount,
    }
  }


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
