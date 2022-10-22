import Head from 'next/head'
import { useContext } from 'react'
import { Center, Divider, Flex, Spacer } from '@chakra-ui/react'

import { Context } from './Context';
import WalletConnectButton from './components/WalletConnectButton';
import ThemeSwitcher from './components/ThemeSwitcher';
import PageHeader from './components/PageHeader'
import NFTMinter from './components/NFTMinter';
import Examples from './components/Examples'
import Footer from './components/Footer'

const Home = () => {

  const { wrongNetwork } = useContext(Context);

  return (
    <div>

      <Head>
        <title>SVGies</title>
        <meta name="description" content="Unique Visual Wallet Identifier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Flex h={14} alignItems='center'>
          <Spacer />
          <WalletConnectButton />
          <ThemeSwitcher />
        </Flex>
        <PageHeader />
        {/* {wrongNetwork ?
          <Center w='100%' h='32rem' ></Center>
          :
          <NFTMinter />
        } */}
        <NFTMinter />
        <Divider />
        <Examples />
        <Divider />
        <Footer />
      </main>

    </div >
  )
}

export default Home
