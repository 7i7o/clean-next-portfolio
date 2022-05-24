import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'

import '@rainbow-me/rainbowkit/styles.css';
import { apiProvider, configureChains, getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiConfig, WagmiProvider } from 'wagmi';

const { chains, provider } = configureChains(
  // [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  // [chain.polygon],
  [chain.polygonMumbai],
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);

const { connectors } = getDefaultWallets({ appName: 'SVGies', chains });

const wagmiClient = createClient({ autoConnect: true, connectors, provider })

function MyApp({ Component, pageProps }) {
  return (

    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        accentColor: '#7928CA',
        accentColorForeground: 'white',
        borderRadius: 'large',
        fontStack: 'system',
      })} >

        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>

      </RainbowKitProvider>
    </WagmiProvider>

  )
}

export default MyApp
