import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import { chain, createClient, WagmiProvider } from 'wagmi';
import { apiProvider, configureChains, getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { useState } from 'react';


const MyApp = ({ Component, pageProps }) => {

  const { chains, provider } = configureChains(
    // [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    // [chain.polygon],
    [chain.polygonMumbai],
    [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
  );
  const { connectors } = getDefaultWallets({ appName: 'SVGies', chains });
  const wagmiClient = createClient({ autoConnect: true, connectors, provider })

  const [walletTheme, setWalletTheme] = useState()
  const rainbowTheme = walletTheme === 'light' ? lightTheme :  darkTheme

  return (
    <ChakraProvider theme={theme}>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={rainbowTheme()} >
          <Component {...pageProps} setWalletTheme={setWalletTheme} />
        </RainbowKitProvider>
      </WagmiProvider>


    </ChakraProvider>
  )
}

export default MyApp
