import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis';
import { AmazonProvider } from '../context/AmazonContext';
import { ModalProvider } from 'react-simple-hook-modal';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER} appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
                     initializeOnMount={false}>
      <AmazonProvider>
        <ModalProvider>
        <Component {...pageProps} />
        </ModalProvider>
      </AmazonProvider>
    </MoralisProvider>
  )
}

export default MyApp
