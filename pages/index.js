import { Box, Button, Center, Divider, Heading, HStack, IconButton, Skeleton, Tag, useColorMode, useColorModeValue, useToast, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import Head from 'next/head'

import SVGies from './components/SVGies';
import { wallets } from '../constants/wallets.js';
import SVGie from './components/SVGie';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Card from './components/Card'

import { contractNameOrAddress } from "../constants/contract"
import contractABI from "../constants/contractABI.json"

const Home = ({ walletTheme, setWalletTheme }) => {

  const { data, isError, isLoading } = useAccount()

  const { colorMode, toggleColorMode } = useColorMode()

  const toast = useToast()
  const toastStatus = 'info'

  const [nextPrice, setNextPrice] = useState()
  const [slowFactor, setSlowFactor] = useState()
  const [totalSupply, setTotalSupply] = useState()
  const [mintPrice, setMintPrice] = useState()
  const [mintActive, setMintActive] = useState()

  const contractInfo = { addressOrName: contractNameOrAddress, contractInterface: contractABI.abi, }

  const { data: mintPriceBN } = useContractRead(contractInfo, 'getPrice', {})
  const { data: nextPriceBN } = useContractRead(contractInfo, 'getNextPrice', {})
  const { data: slowFactorBN } = useContractRead(contractInfo, 'getSlowFactor', {})
  const { data: totalSupplyBN } = useContractRead(contractInfo, 'getTotalSupply', {})
  const { data: mintActiveResult } = useContractRead(contractInfo, 'isMintActive', {})
  const { data: mintTx, error: mintError, isError: mintIsError, isLoading: mintIsLoading, write } =
    useContractWrite(contractInfo, 'safeMint', { args: [data?.address], value: mintPriceBN })

  const col = {
    accent: useColorModeValue('svgieLight.accent', 'svgieDark.accent'),
    accent2: useColorModeValue('svgieLight.accent2', 'svgieDark.accent2'),
  }

  useEffect(() => {
    if (!colorMode) return;
    setWalletTheme(colorMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode])

  useEffect(() => {
    // console.log('price is: ', mintPriceBN)
    if (!mintPriceBN) return;
    setMintPrice(ethers.utils.formatEther(mintPriceBN))
  }, [mintPriceBN])

  useEffect(() => {
    // console.log('nextPrice is: ', nextPriceBN)
    if (!nextPriceBN) return;
    setNextPrice(ethers.utils.formatEther(nextPriceBN))
  }, [nextPriceBN])

  useEffect(() => {
    // console.log('slowFactor is: ', slowFactorBN)
    if (!slowFactorBN) return;
    setSlowFactor(slowFactorBN.toNumber())
  }, [slowFactorBN])

  useEffect(() => {
    // console.log('totalSupply is: ', totalSupplyBN)
    if (!totalSupplyBN) return;
    setTotalSupply(totalSupplyBN.toNumber())
  }, [totalSupplyBN])

  useEffect(() => {
    // console.log('totalSupply is: ', totalSupplyBN)
    // if (!mintActiveResult) return;
    setMintActive(mintActiveResult)
  }, [mintActiveResult])

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      console.log('Minting Error: ', mintError)
      toast({
        title: `Error minting your SVGie`,
        status: 'error',
        isClosable: true,
      })
    }

    console.log(mintTx)
    // toast({
    //   title: `You minted your SVGie!`,
    //   status: 'success',
    //   isClosable: true,
    // })

  }, [mintTx, mintError, mintIsError, mintIsLoading])

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

        <Center w='100%' h={32} >
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
        <Center w='100%' h='32rem' >
          {(
            isLoading ?
              <Skeleton>
                <Card
                  size='xl'
                  variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                />
              </Skeleton>
              : isError ?
                <Card
                  size='xl'
                  variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                >
                  <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                    Error Loading Account
                  </Center>
                </Card>
                : !data ?
                  <Card
                    size='xl'
                    variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                  >
                    <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                      Please Connect Wallet to Mint or View your SVGie
                    </Center>
                  </Card>
                  : <VStack >
                    <SVGie
                      address={data?.address}
                      tokenId={ethers.BigNumber.from(data?.address)}
                      size='xl'
                      variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                    />
                    <Center >
                      <Button
                        disabled={!mintActive || mintIsLoading}
                        onClick={() => write()
                          // toast({
                          //   title: `Coming Soon`,
                          //   status: toastStatus,
                          //   isClosable: true,
                          // })
                        }
                      >
                        Mint ({mintActive ? mintPrice : 'SOON'})
                      </Button>
                    </Center>
                    <HStack >
                      <Tag>Next Price in {!nextPrice || !slowFactor ? 0 : nextPrice * slowFactor - totalSupply} mints</Tag>
                      <Tag>Next Price: {nextPrice} MATIC</Tag>
                      <Tag>Delay ratio: {slowFactor}</Tag>
                    </HStack>
                    <Center pl='3em' pr='3em' align={'center'} pb={0}>
                      ( Price follows a flattened Fibonacci curve, related to amount of NFTs minted)
                    </Center>

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
            textShadow={colorMode === 'light' ? '0 0 10px #7928ca' : '0 0 10px #ff0080'}
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
