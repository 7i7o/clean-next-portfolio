import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import { theme } from '../theme'

import '@rainbow-me/rainbowkit/styles.css';
import { apiProvider, configureChains, getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme, wallet } from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiConfig, WagmiProvider } from 'wagmi';
import { useState } from 'react';

const { chains, provider } = configureChains(
  // [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  // [chain.polygon],
  [chain.polygonMumbai],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);

const { connectors } = getDefaultWallets({ appName: 'SVGies', chains });

const wagmiClient = createClient({ autoConnect: true, connectors, provider })

function MyApp({ Component, pageProps }) {

  const [walletTheme, setWalletTheme] = useState()

  return (

    <ChakraProvider theme={theme}>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={ walletTheme === 'light' ? lightTheme() : darkTheme() }
        >
          <Component {...pageProps} walletTheme={walletTheme} setWalletTheme={setWalletTheme} />

        </RainbowKitProvider>
      </WagmiProvider>
    </ChakraProvider>

  )
}

export default MyApp
