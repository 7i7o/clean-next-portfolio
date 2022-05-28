import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'

import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// import { getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit';
// import '@rainbow-me/rainbowkit/styles.css';

import { useState } from 'react';

const alchemyId = process.env.ALCHEMY_ID

const MyApp = ({ Component, pageProps }) => {

  const { chains, provider, webSocketProvider } = configureChains(
    // [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    // [chain.polygon],
    [chain.polygonMumbai],
    // [chain.polygonMumbai, chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    [alchemyProvider({ alchemyId }), publicProvider()]
  );

  // const { connectors } = getDefaultWallets({ appName: 'SVGies', chains });
  const connectors = [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({ chains, options: { appName: 'wagmi', }, }),
    new WalletConnectConnector({ chains, options: { qrcode: true, }, }),
    new InjectedConnector({ chains, options: { name: 'Injected', shimDisconnect: true, }, }),
  ]
  const wagmiClient = createClient({ autoConnect: true, connectors, provider, webSocketProvider })

  // const [walletTheme, setWalletTheme] = useState()
  // const rainbowTheme = (walletTheme === 'light') ? lightTheme() : darkTheme()

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        {/* <RainbowKitProvider chains={chains} theme={rainbowTheme} > */}
        {/* <Component {...pageProps} setWalletTheme={setWalletTheme} /> */}
        <Component {...pageProps} />
        {/* </RainbowKitProvider> */}
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp
