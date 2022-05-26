import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { useState } from 'react';


const MyApp = ({ Component, pageProps }) => {

  const { chains, provider } = configureChains(
    // [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    // [chain.polygon],
    [chain.polygonMumbai],
    [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
  );
  const { connectors } = getDefaultWallets({ appName: 'SVGies', chains });
  const wagmiClient = createClient({ autoConnect: true, connectors, provider })

  const [walletTheme, setWalletTheme] = useState()
  const rainbowTheme = (walletTheme === 'light') ? lightTheme() : darkTheme()

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={rainbowTheme} >
          <Component {...pageProps} setWalletTheme={setWalletTheme} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp
