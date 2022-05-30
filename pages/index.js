import { Center, Divider, Flex, IconButton, Spacer, useColorMode } from '@chakra-ui/react'
import Head from 'next/head'

import PageHeader from './components/PageHeader'
import NFTManager from './components/NFTMinter';
import Examples from './components/Examples'
import Footer from './components/Footer'
import { useState } from 'react'
import WalletConnectButton from './components/WalletConnectButton';
import ThemeSwitcher from './components/ThemeSwitcher';

const Home = (props) => {

  // const { colorMode, toggleColorMode } = useColorMode()

  const [wrongNetwork, setWrongNetwork] = useState(true)

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
          <WalletConnectButton wrongNetwork={wrongNetwork} setWrongNetwork={setWrongNetwork} />
          <ThemeSwitcher />
        </Flex>
        <PageHeader />
        {wrongNetwork ?
          <Center w='100%' h='32rem' ></Center>
          :
          <NFTManager wrongNetwork={wrongNetwork} />
        }
        <Divider />
        <Examples />
        <Divider />
        <Footer />

      </main>
    </div >
  )
}

export default Home
