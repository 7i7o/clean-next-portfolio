import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'

import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import ContextProvider from './Context';
// import { ContextProvider } from './Context';

const alchemyId = process.env.ALCHEMY_ID_MAINNET

const MyApp = ({ Component, pageProps }) => {

  const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet],
    // [chain.polygonMumbai],
    // [chain.polygon],
    [alchemyProvider({ alchemyId }), publicProvider()]
  );

  const connectors = [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({ chains, options: { appName: 'wagmi', }, }),
    new WalletConnectConnector({ chains, options: { qrcode: true, }, }),
    new InjectedConnector({ chains, options: { name: 'Injected', shimDisconnect: true, }, }),
  ]
  const wagmiClient = createClient({ autoConnect: true, connectors, provider, webSocketProvider })

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp
