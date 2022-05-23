import { Box, Button, Center, Divider, Heading, HStack, Skeleton, Stack, Tag, Text, useToast, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Head from 'next/head'

import SVGies from './components/SVGies';
import { wallets } from '../constants/wallets.js';

const Home = () => {

  const { data, isError, isLoading } = useAccount()

  const toast = useToast()
  const toastStatus = 'info'

  const nextPrice = 0;
  const slowFactor = 0;
  const totalSupply = 0;
  const mintPrice = 0;

  return (
    <div>
      <Head>
        <title>SVGies</title>
        <meta name="description" content="Unique Visual Wallet Identifier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Center w='100%' h='10em' >
          <Heading
            bgGradient={'linear(to-b, #FF0080, #7928CA)'}
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
            <Center pl='3em' pr='3em' align={'center'}>You can think of them as Blockies from the future</Center>
            <Center pl='3em' pr='3em' align={'center'}>Drawn as generative art in a beautifully detailed and colorful SVG</Center>
            <Center pl='3em' pr='3em' align={'center'}>Using Quadratic and Cubic Bézier curves and leveraging our brain&apos;s ability to remember vertical simmetry</Center>
          </VStack>
        </Center>
        <Center w='100%' h='28em' >
          {(isLoading &&
            <Skeleton>
              <Center
                boxSize={340}
                bg='#ffffffcc' borderRadius={'.75em'}
                _hover={{ boxShadow: '0 0 8px #ff0080', bg: '#ffffffee' }}>
                <Box w={300} h={300} />
              </Center>
            </Skeleton>)}
          {(isError && <>Error Loading Account</>)}
          {(!isLoading && !isError && !data && <>Please Connect Wallet to Mint or View your SVGie</>)}
          {(!isLoading && !isError && data &&
            <VStack >
              <Center
                boxSize={340}
                bg='#ffffffcc'
                borderRadius={'.75em'}
                _hover={{ boxShadow: '0 0 8px #ff0080', bg: '#ffffffee' }}>
                <SVGies address={data?.address} width={300} height={300} />
              </Center>
              <Center >
                <Button
                  // onClick={() => { window.alert('coming soon') }}
                  onClick={() =>
                    toast({
                      title: `Coming Soon`,
                      status: toastStatus,
                      isClosable: true,
                    }) }
                >
                  Mint ({mintPrice} MATIC)
                </Button>
              </Center>
              <HStack >
                  <Tag>Next Price in {nextPrice * slowFactor - totalSupply} mints</Tag>
                  <Tag>Next Price: {nextPrice}</Tag>
              </HStack>
            </VStack>)}
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
                  <Center boxSize={190} bg='#ffffffcc' borderRadius={'.75em'}
                    _hover={{ boxShadow: '0 0 8px #ff0080', bg: '#ffffffee' }}>
                    <SVGies address={w} width={150} height={150} />
                  </Center>
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
