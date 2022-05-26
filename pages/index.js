import { Divider } from '@chakra-ui/react'
import Head from 'next/head'

import PageHeader from './components/PageHeader'
import ThemeSwitcher from './components/ThemeSwitcher'
import Examples from './components/Examples'
import Footer from './components/Footer'
import WalletConnectButton from './components/WalletConnectButton'
import NFTManager from './components/NFTManager';

const Home = (props) => {

  const { setWalletTheme } = props

  return (
    <div>
      <Head>
        <title>SVGies</title>
        <meta name="description" content="Unique Visual Wallet Identifier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ThemeSwitcher setWalletTheme={setWalletTheme} />
        <PageHeader />
        <NFTManager />
        <WalletConnectButton />
        <Divider />
        <Examples />
        <Divider />
        <Footer />

      </main>
    </div >
  )
}

export default Home
