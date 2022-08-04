import { Center, Input } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { Context } from "../Context"
import ContractWrite from "./ContractWrite"
import NFTLinks from "./NFTLinks"

const OwnerTeamMint = () => {

    // const { arg } = props
    // const { contractInfo } = useContext(Context)

    const [teamAddress, setTeamAddress] = useState('')
    const [mintedAddress, setMintedAddress] = useState('')

    const txCallback = 'teamMint'
    const buttonText = 'Team Mint'
    const buttonLoadingText = 'Minting as Team...'

    const eventFilter = 'Transfer'
    const eventCallback = (args) => {
        if (!args?.length) return
        if (!args.length > 1) console.log(args)
        setMintedAddress(args[1])
    }

    return (
        <Center py='.5em'>
            <ContractWrite
                buttonDisabled={false}
                buttonText={buttonText}
                buttonLoadingText={buttonLoadingText}
                txCallback={txCallback}
                argsArray={[teamAddress]}
                overridesObj={{}}
                eventNameFilterOnce={eventFilter}
                eventArgsCallback={eventCallback}
            />
            <Input
                placeholder='0x...'
                value={teamAddress}
                onChange={e => setTeamAddress(e.target.value)}
            />
            {mintedAddress &&
                <NFTLinks
                    iconSize={10}
                    tokenId={ethers.BigNumber.from(mintedAddress)}
                />
            }
        </Center>
    )
}

export default OwnerTeamMint