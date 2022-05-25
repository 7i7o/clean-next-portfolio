import { Center } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const WalletConnectButton = () => {
    return (
        <Center w='100%' h='6em' pb='2em'>
            <ConnectButton
                accountStatus={{ smallScreen: 'avatar', largeScreen: 'address', }}
                chainStatus={{ smallScreen: 'icon', largeScreen: 'full', }}
                showBalance={{ smallScreen: false, largeScreen: true, }}
            />
        </Center>
    )
}

export default WalletConnectButton