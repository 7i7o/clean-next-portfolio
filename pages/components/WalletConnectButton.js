import { Button, Center, HStack, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Tag, VStack } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName, useNetwork } from 'wagmi'
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
// import { Center } from "@chakra-ui/react"
// import { ConnectButton } from "@rainbow-me/rainbowkit"

const alchemyId = process.env.ALCHEMY_ID_MAINNET

const WalletConnectButton = (props) => {

    const { wrongNetwork, setWrongNetwork } = props

    const { data: account } = useAccount()
    // const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
    // const { data: ensName } = useEnsName({ address: account?.address })
    const { connect, connectors, error, isConnecting, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()
    const { activeChain, chains, error: errorNetwork, isLoading, pendingChainId, switchNetwork } = useNetwork()
    const [otherNetworks, setOtherNetworks] = useState()

    const [ensName, setEnsName] = useState()
    const [ensAvatar, setEnsAvatar] = useState()

    const mainnetProvider = new ethers.providers.AlchemyProvider(1, alchemyId);

    useEffect(() => {
        if (!mainnetProvider || !account?.address) return;
        const getEnsName = async () => await mainnetProvider.lookupAddress(account?.address)
        getEnsName().then(
            ret => { if (ret) setEnsName(ret) },
            err => console.log('err ', err)
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])

    useEffect(() => {
        if (!mainnetProvider || !ensName) return;
        const getEnsAvatar = async () => await mainnetProvider.getAvatar(ensName)
        getEnsAvatar().then(
            ret => { if (ret) setEnsAvatar(ret) },
            err => console.log('err ', err)
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ensName])

    useEffect(() => {
        if (!activeChain) return;
        const rightNetwork = chains.some(x => x.id === activeChain?.id)
        setWrongNetwork(!rightNetwork)
        setOtherNetworks(chains.filter((x) => (switchNetwork && x.id !== activeChain?.id)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChain])

    const shortAddress = addr => addr.slice(0, 5) + '...' + addr.slice(38)

    const changeNetwork = () => {
        // const rightNetwork = chains.some(x => x.id === activeChain?.id)
        if (chains.length === 1 && !wrongNetwork) {
            return ''
        }
        return (
            <Popover placement='bottom'>
                <PopoverTrigger>
                    {!wrongNetwork ?
                        <Button >Switch Network</Button>
                        :
                        <Button colorScheme='red' >Wrong Network</Button>
                    }
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Select Network</PopoverHeader>
                        <PopoverCloseButton br='full' />
                        <PopoverBody>
                            <VStack>
                                {otherNetworks?.map((x) => (
                                    <Button
                                        w='100%'
                                        colorScheme='blue'
                                        disabled={!switchNetwork || x.id === activeChain?.id}
                                        key={x.id}
                                        onClick={() => switchNetwork?.(x.id)}
                                    >
                                        {x.name}
                                        {isLoading && pendingChainId === x.id && ' (switching)'}
                                    </Button>
                                ))}
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        )
    }

    return (
        <HStack>
            {account ?
                <>
                    {errorNetwork ? <Center>{errorNetwork.message}</Center> : ''}
                    <Tag h='3em'>
                        <Center px='.5em'>
                            {ensAvatar ? <Image src={ensAvatar} alt="ENS Avatar" /> : ''}
                            {`${ensName ? ensName : shortAddress(account.address)}`}
                            {/* {`${ensName ? ensName : shortAddress(account.address)}${activeChain ? ' (' + activeChain.name + ')' : ''}`} */}
                        </Center>
                    </Tag>
                    {changeNetwork()}
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