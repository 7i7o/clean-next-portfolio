import '../styles/globals.css'

// Adding RainbowKit for a Sign In With Ethereum experience
import '@rainbow-me/rainbowkit/styles.css';

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.rinkeby],
  [
    apiProvider.alchemy(process.env.ALCHEMY_ID),
    apiProvider.fallback()
  ]
);

const { connectors } = getDefaultWallets({
  // appName: 'My RainbowKit App',
  appName: process.env.NEXT_PUBLIC_APP_NAME,
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const  MyApp = ({ Component, pageProps }) => {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
        appInfo={{
          appName: process.env.NEXT_PUBLIC_APP_NAME,
          // learnMoreUrl: 'https://learnaboutcryptowallets.example',
        }}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default MyApp
