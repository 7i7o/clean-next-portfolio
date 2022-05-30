import { HStack, Tag } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useContractRead } from "wagmi"

const NFTInfo = (props) => {

    const { setMintActive, setMintPrice, setOwner, contractInfo } = props

    const { data: mintPriceBN } = useContractRead(contractInfo, 'getPrice', {})
    const { data: nextPriceBN } = useContractRead(contractInfo, 'getNextPrice', {})
    const { data: slowFactorBN } = useContractRead(contractInfo, 'getSlowFactor', {})
    const { data: totalSupplyBN } = useContractRead(contractInfo, 'getTotalSupply', {})
    const { data: mintActive } = useContractRead(contractInfo, 'isMintActive', {})
    const { data: owner } = useContractRead(contractInfo, 'getOwner', {})

    useEffect(() => {
        setMintActive(mintActive)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mintActive])

    useEffect(() => {
        if (!mintPriceBN) return;
        setMintPrice(mintPriceBN)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mintPriceBN])

    useEffect(() => {
        if (!owner) return;
        setOwner(owner)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [owner])

    const priceMintsLeft = nextPriceBN * slowFactorBN - totalSupplyBN * 10 ** 18
    return (
        <HStack >
            {/* <Tag>Next Price in {!nextPrice || !slowFactor ? 0 : (nextPrice / 10 ** 18 * slowFactor) - totalSupply} mints</Tag> */}
            <Tag>{priceMintsLeft > 0 ? `${priceMintsLeft + 1} mints ` : 'Last mint '}left for current price</Tag>
            <Tag>Next Price: {nextPriceBN / 10 ** 18} MATIC</Tag>
            <Tag>Flattener factor: {slowFactorBN.toNumber()}</Tag>
        </HStack>
    )
}

export default NFTInfo