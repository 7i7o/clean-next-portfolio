import { Button, ButtonGroup, Center, HStack, Image, Tag } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName, } from 'wagmi'
// import { Center } from "@chakra-ui/react"
// import { ConnectButton } from "@rainbow-me/rainbowkit"

const WalletConnectButton = () => {

    const { data: account } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
    const { data: ensName } = useEnsName({ address: account?.address })
    const { connect, connectors, error, isConnecting, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()

    return (
        <HStack>
            {account ?
                <>
                    <Tag p='.8em'>
                        {ensAvatar ? <Image src={ensAvatar} alt="ENS Avatar" /> : ''}
                        <Center>
                            {`${ensName ? ensName : account.address}`}
                        </Center>
                        {/* <Center>&nbsp;({account.connector?.name})</Center> */}
                    </Tag>
                    <Button onClick={disconnect}>Disconnect</Button>
                </>
                :

                error ?
                    <Center>{error.message}</Center>
                    :
                    <ButtonGroup>
                        {connectors.map((connector) => (
                            <Button
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
                    </ButtonGroup>
            }

        </HStack>
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