import { Divider, Flex, IconButton, Spacer, useColorMode } from '@chakra-ui/react'
import Head from 'next/head'

import PageHeader from './components/PageHeader'
import NFTManager from './components/NFTManager';
import Examples from './components/Examples'
import Footer from './components/Footer'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useEffect } from 'react'

const Home = (props) => {

  const { setWalletTheme } = props
  const { colorMode, toggleColorMode } = useColorMode()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setWalletTheme(colorMode) }, [colorMode])

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
          <ConnectButton
          // accountStatus={{ smallScreen: 'avatar', largeScreen: 'address', }}
          // chainStatus={{ smallScreen: 'icon', largeScreen: 'name', }}
          // showBalance={{ smallScreen: false, largeScreen: true, }}
          />
          <IconButton
            mx='.5em'
            rounded='full'
            aria-label='Toggle dark mode'
            bgColor='transparent'
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            _hover={{
              bgColor: 'transparent',
            }}
          />
        </Flex>
        <PageHeader />
        <NFTManager />
        <Divider />
        <Examples />
        <Divider />
        <Footer />

      </main>
    </div >
  )
}

export default Home
