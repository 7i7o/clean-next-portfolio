import { Center, Link } from "@chakra-ui/react"
import { etherscanBaseUri, openseaBaseUri } from "../../constants/constants"
import EtherscanIcon from "./EtherscanIcon"
import OpenSeaIcon from "./OpenSeaIcon"


const NFTLinks = (props) => {

    const { tokenId, iconSize } = props

    return (
        <Center>
            <Link
                mx='.25em'
                rounded='full'
                aria-label='OpenSea Link'
                alt='OpenSea Link'
                href={openseaBaseUri + tokenId?.toString()}
                isExternal>
                <OpenSeaIcon width={iconSize} height={iconSize} />
            </Link>
            <Link
                mx='.5em'
                rounded='full'
                aria-label='Etherscan Link'
                alt='Etherscan Link'
                href={etherscanBaseUri + tokenId?.toString()}
                isExternal>
                <EtherscanIcon width={iconSize} height={iconSize} />
            </Link>
        </Center>
    )
}

export default NFTLinks