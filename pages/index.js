import Head from 'next/head'
import { Divider, Flex, Spacer, useColorMode } from '@chakra-ui/react'

import ThemeSwitcher from './components/ThemeSwitcher';
import PageHeader from './components/PageHeader'
import NFT from './components/NFT';
import Examples from './components/Examples'
import Footer from './components/Footer'
// import WalletConnectButton from './components/WalletConnectButton';

/** Rainbow Kit Imports**/
const alchemyId = process.env.ALCHEMY_ID_MAINNET
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultWallets, lightTheme, RainbowKitProvider, } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig, } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import dynamic from 'next/dynamic';

/** Disable ssr for the ConnectWallet button **/
const WalletRainbowConnectButton = dynamic(() => import('./components/WalletRainbowConnectButton'), { ssr: false, });

const Home = () => {

  /** Rainbow Kit Configs**/
  const { chains, provider } = configureChains(
    [chain.mainnet],
    [alchemyProvider({ alchemyId: alchemyId }), publicProvider()]
  );
  const { connectors } = getDefaultWallets({ appName: 'SVGies', chains });
  const wagmiClient = createClient({ autoConnect: true, connectors, provider })

  const { colorMode } = useColorMode()

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={colorMode === 'light' ? lightTheme() : darkTheme()}>
        <div>

          <Head>
            <title>SVGies</title>
            <meta name="description" content="Unique Visual Wallet Identifier" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <Flex h={14} alignItems='center'>
              <Spacer />
              <WalletRainbowConnectButton />
              <ThemeSwitcher />
            </Flex>
            <PageHeader />
            <NFT />
            <Divider />
            <Examples />
            <Divider />
            <Footer />
          </main>

        </div >
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Home
