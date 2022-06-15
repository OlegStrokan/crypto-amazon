import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MoralisProvider } from 'react-moralis';
import { AmazonProvider } from '../context/AmazonContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER} appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
                     initializeOnMount={false}>
      <AmazonProvider>
        <Component {...pageProps} />
      </AmazonProvider>
    </MoralisProvider>
  )
}

export default MyApp
