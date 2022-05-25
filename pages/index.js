import { Box, Button, Center, Divider, Heading, HStack, IconButton, Skeleton, Tag, useColorMode, useColorModeValue, useToast, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Head from 'next/head'

import SVGies from './components/SVGies';
import { wallets } from '../constants/wallets.js';
import SVGie from './components/SVGie';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import Card from './components/Card'

const Home = ({ walletTheme, setWalletTheme }) => {

  const { data, isError, isLoading } = useAccount()

  const { colorMode, toggleColorMode } = useColorMode()

  const toast = useToast()
  const toastStatus = 'info'

  const nextPrice = 0;
  const slowFactor = 0;
  const totalSupply = 0;
  const mintPrice = 0;

  const col = {
    placeholder: useColorModeValue('svgieLight.placeholder', 'svgieDark.placeholder'),
    boxBg: useColorModeValue('svgieLight.boxBg', 'svgieDark.boxBg'),
    boxBgHover: useColorModeValue('svgieLight.boxBgHover', 'svgieDark.boxBgHover'),
    accent: useColorModeValue('svgieLight.accent', 'svgieDark.accent'),
    accent2: useColorModeValue('svgieLight.accent2', 'svgieDark.accent2'),
  }

  useEffect(() => {
    if (!colorMode) return;
    setWalletTheme(colorMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode])

  return (
    <div>
      <Head>
        <title>SVGies</title>
        <meta name="description" content="Unique Visual Wallet Identifier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box align='end' >
          <IconButton
            rounded='full'
            aria-label='Toggle dark mode'
            bgColor='transparent'
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            _hover={{
              bgColor: 'transparent',
            }}
          />
        </Box>

        <Center w='100%' h='10em' >
          <Heading
            bgGradient={`linear(to-b, ${col.accent2}, ${col.accent})`}
            bgClip='text'
            fontSize='7xl'
            fontWeight='extrabold'
          // textShadow='0 0 10px #ff0080'
          >
            SVGies
          </Heading>
        </Center>

        <Center>
          <VStack >
            <Center pl='3em' pr='3em' align={'center'}>SVGies are a unique visual representation of your wallet address</Center>
            <Center pl='3em' pr='3em' align={'center'}>You can only mint ONE because they are a 1:1 representation of your wallet</Center>
            <Center pl='3em' pr='3em' align={'center'}>They are stored on-chain in the Polygon mainnet network</Center>
            <Center pl='3em' pr='3em' align={'center'}>You can think of them as Blockies that evolved to SVGs (Scalable Vector Graphics never get pixelated)</Center>
            <Center pl='3em' pr='3em' align={'center'}>Drawn as generative art in a beautifully detailed and colorful SVG</Center>
            <Center pl='3em' pr='3em' align={'center'}>Using Quadratic and Cubic Bézier curves and leveraging our brain&apos;s ability to remember vertical simmetry</Center>
            <Center pl='3em' pr='3em' align={'center'}>It is tied to your wallet and cannot be transfered</Center>
          </VStack>
        </Center>
        <Center w='100%' h='28em' >
          {(
            isLoading ?
              <Skeleton>
                <Center
                  boxSize={240}
                  borderRadius={'.75em'}
                  bg={col.boxBg}
                  _hover={{ boxShadow: `0 0 8px ${col.accent}`, bg: col.boxBgHover }}
                >
                  <Box w={200} h={200} bg={col.placeholder} />
                </Center>
              </Skeleton>
              : isError ?
                <>Error Loading Account</>
                : !data ?
                  <>Please Connect Wallet to Mint or View your SVGie</>
                  : <VStack >
                    <SVGie
                      address={data?.address}
                      tokenId={ethers.BigNumber.from(data?.address)}
                      size='xl'
                      variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                    />
                    <Center >
                      <Button
                        // onClick={() => { window.alert('coming soon') }}
                        onClick={() =>
                          toast({
                            title: `Coming Soon`,
                            status: toastStatus,
                            isClosable: true,
                          })}
                      >
                        Mint ({mintPrice} MATIC)
                      </Button>
                    </Center>
                    <HStack >
                      <Tag>Next Price in {nextPrice * slowFactor - totalSupply} mints</Tag>
                      <Tag>Next Price: {nextPrice} MATIC</Tag>
                    </HStack>
                  </VStack>
          )}
        </Center>
        <Center w='100%' h='6em' pb='2em'>
          <ConnectButton
            accountStatus={{ smallScreen: 'avatar', largeScreen: 'address', }}
            chainStatus={{ smallScreen: 'icon', largeScreen: 'name', }}
            showBalance={{ smallScreen: false, largeScreen: true, }}
          />
        </Center>

        <Divider />

        <Center h='7em'>
          <Heading
            fontSize='4xl'
            fontWeight='extrabold'
            // textShadow='0 0 10px #ff0080'
            textShadow='0 0 10px #7928ca'
          >
            SVGies Examples
          </Heading>
        </Center>

        <Center pb='3em'>
          <Wrap spacing="30px" pt='10px' pb='10px' justify='center' >
            {wallets.map((w, i) => {
              return (
                <WrapItem key={i}>
                  <Card
                    size='sm'
                    variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                  >
                    <SVGies className='SVGiejs' address={w} width={150} height={150} />
                  </Card>
                </WrapItem>
              )
            })}
          </Wrap>
        </Center>

        <Divider />

        <Center h='7em' >
          2022 MIT License &copy; 7i7o
        </Center>
      </main>
    </div >
  )
}

export default Home
