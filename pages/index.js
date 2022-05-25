import { Button, Center, Divider, HStack, Skeleton, Tag, useColorMode, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import Head from 'next/head'

import SVGie from './components/SVGie';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Card from './components/Card'

import { contractNameOrAddress } from "../constants/contract"
import contractABI from "../constants/contractABI.json"
import PageHeader from './components/PageHeader'
import ThemeSwitcher from './components/ThemeSwitcher'
import Examples from './components/Examples'
import Footer from './components/Footer'
import WalletConnectButton from './components/WalletConnectButton'
import NFTManager from './components/NFTManager';

const Home = () => {

  // const { data, isError, isLoading } = useAccount()

  // const cardVariant = useColorModeValue('shadowLight', 'shadowDark')

  // const toast = useToast()

  // const [nextPrice, setNextPrice] = useState()
  // const [slowFactor, setSlowFactor] = useState()
  // const [totalSupply, setTotalSupply] = useState()
  // const [mintPrice, setMintPrice] = useState()
  // const [mintActive, setMintActive] = useState()

  // const contractInfo = { addressOrName: contractNameOrAddress, contractInterface: contractABI.abi, }

  // const { data: mintPriceBN } = useContractRead(contractInfo, 'getPrice', {})
  // const { data: nextPriceBN } = useContractRead(contractInfo, 'getNextPrice', {})
  // const { data: slowFactorBN } = useContractRead(contractInfo, 'getSlowFactor', {})
  // const { data: totalSupplyBN } = useContractRead(contractInfo, 'getTotalSupply', {})
  // const { data: mintActiveResult } = useContractRead(contractInfo, 'isMintActive', {})
  // const { data: mintTx, error: mintError, isError: mintIsError, isLoading: mintIsLoading, write } =
  //   useContractWrite(contractInfo, 'safeMint', { args: [data?.address], value: mintPriceBN })

  // useEffect(() => {
  //   // console.log('price is: ', mintPriceBN)
  //   if (!mintPriceBN) return;
  //   setMintPrice(ethers.utils.formatEther(mintPriceBN))
  // }, [mintPriceBN])

  // useEffect(() => {
  //   // console.log('nextPrice is: ', nextPriceBN)
  //   if (!nextPriceBN) return;
  //   setNextPrice(ethers.utils.formatEther(nextPriceBN))
  // }, [nextPriceBN])

  // useEffect(() => {
  //   // console.log('slowFactor is: ', slowFactorBN)
  //   if (!slowFactorBN) return;
  //   setSlowFactor(slowFactorBN.toNumber())
  // }, [slowFactorBN])

  // useEffect(() => {
  //   // console.log('totalSupply is: ', totalSupplyBN)
  //   if (!totalSupplyBN) return;
  //   setTotalSupply(totalSupplyBN.toNumber())
  // }, [totalSupplyBN])

  // useEffect(() => {
  //   // console.log('totalSupply is: ', totalSupplyBN)
  //   // if (!mintActiveResult) return;
  //   setMintActive(mintActiveResult)
  // }, [mintActiveResult])

  // useEffect(() => {
  //   if (isLoading) return;

  //   if (isError) {
  //     console.log('Minting Error: ', mintError)
  //     toast({
  //       title: `Error minting your SVGie`,
  //       status: 'error',
  //       isClosable: true,
  //     })
  //   }

  //   if (!mintTx) return

  //   console.log(mintTx)
  //   // toast({
  //   //   title: `You minted your SVGie!`,
  //   //   status: 'success',
  //   //   isClosable: true,
  //   // })

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [mintTx, mintError, mintIsError, mintIsLoading])

  return (
    <div>
      <Head>
        <title>SVGies</title>
        <meta name="description" content="Unique Visual Wallet Identifier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <ThemeSwitcher />

        <PageHeader />

        <NFTManager />
        {/* <Center w='100%' h='32rem' >
          {(
            isLoading ?
              <Skeleton>
                <Card
                  size='xl'
                  // variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                  variant={cardVariant}
                />
              </Skeleton>
              : isError ?
                <Card
                  size='xl'
                  // variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                  variant={cardVariant}
                >
                  <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                    Error Loading Account
                  </Center>
                </Card>
                : !data ?
                  <Card
                    size='xl'
                    // variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                    variant={cardVariant}
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
                      // variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                      variant={cardVariant}
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
        </Center> */}

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
