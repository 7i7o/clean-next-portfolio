import { Button, Center, HStack, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Tag, VStack } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName, useNetwork } from 'wagmi'
// import { Center } from "@chakra-ui/react"
// import { ConnectButton } from "@rainbow-me/rainbowkit"

const WalletConnectButton = () => {

    const { data: account } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
    const { data: ensName } = useEnsName({ address: account?.address })
    const { connect, connectors, error, isConnecting, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()
    const { activeChain, chains, error: errorNetwork, isLoading, pendingChainId, switchNetwork } = useNetwork()

    const shortAddress = addr => addr.slice(0, 5) + '...' + addr.slice(38)

    return (
        <HStack>
            {account ?
                <>
                    {errorNetwork ? <Center>{errorNetwork.message}</Center> : ''}
                    <Tag h='3em'>
                        {ensAvatar ? <Image src={ensAvatar} alt="ENS Avatar" /> : ''}
                        <Center px='.5em'>
                            {`${ensName ? ensName : shortAddress(account.address)}${activeChain ? ' (' + activeChain.name + ')' : ''}`}
                        </Center>
                    </Tag>
                    <>
                        {chains.map((x) => (
                            !switchNetwork || x.id === activeChain?.id ?
                                ''
                                :
                                <Button
                                    colorScheme='blue'
                                    disabled={!switchNetwork || x.id === activeChain?.id}
                                    key={x.id}
                                    onClick={() => switchNetwork?.(x.id)}
                                >

                                    {`Only on ${x.name}`}
                                    {isLoading && pendingChainId === x.id && ' (switching)'}
                                </Button>
                        ))}
                    </>
                    <Button onClick={disconnect}>Disconnect</Button>
                </>
                :

                <HStack>
                    {error ? <Center>{error.message}</Center> : <></>}
                    {<Popover placement='bottom-end'>
                        <PopoverTrigger>
                            <Button colorScheme='blue' >Connect Wallet</Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>Select your Wallet</PopoverHeader>
                                <PopoverCloseButton br='full' />
                                <PopoverBody>
                                    <VStack>
                                        {connectors.map((connector) => (
                                            <Button
                                                w='100%'
                                                disabled={!connector.ready}
                                                key={connector.id}
                                                onClick={() => connect(connector)}
                                            >
                                                {connector.name}
                                                {!connector.ready && ' (unsupported)'}
                                                {isConnecting &&
                                                    connector.id === pendingConnector?.id &&
                                                    ' (connecting)'}
                                            </Button>
                                        ))}
                                    </VStack>
                                    {/* <Button colorScheme='blue'>Button</Button> */}
                                </PopoverBody>
                                {/* <PopoverFooter>This is the footer</PopoverFooter> */}
                            </PopoverContent>
                        </Portal>
                    </Popover>
                    }
                </HStack>
            }

        </HStack >
    )
    // <Center w='100%' h='6em' pb='2em'>
    // <ConnectButton
    //     accountStatus={{ smallScreen: 'avatar', largeScreen: 'address', }}
    //     chainStatus={{ smallScreen: 'icon', largeScreen: 'full', }}
    //     showBalance={{ smallScreen: false, largeScreen: true, }}
    // />
    // </Center>
    // )

}

export default WalletConnectButton