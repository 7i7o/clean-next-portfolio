import { HStack, Tag } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import { useContractRead } from "wagmi"
import { Context } from "../Context"

const NFTInfo = () => {

    const { setMintActive, setMintPrice, setOwner, addressOrName, contractInterface } = useContext(Context)

    // const { data: mintPriceBN } = useContractRead(contractInfo, 'getPrice', {})
    // const { data: nextPriceBN } = useContractRead(contractInfo, 'getNextPrice', {})
    // const { data: slowFactorBN } = useContractRead(contractInfo, 'getSlowFactor', {})
    // const { data: totalSupplyBN } = useContractRead(contractInfo, 'getTotalSupply', {})
    // const { data: mintActive } = useContractRead(contractInfo, 'isMintActive', {})
    // const { data: owner } = useContractRead(contractInfo, 'getOwner', {})

    const { data: mintPriceBN } = useContractRead({ addressOrName, contractInterface, functionName: 'price' })
    const { data: totalSupplyBN } = useContractRead({ addressOrName, contractInterface, functionName: 'totalSupply' })
    const { data: mintActive } = useContractRead({ addressOrName, contractInterface, functionName: 'mintActive' })
    const { data: owner } = useContractRead({ addressOrName, contractInterface, functionName: 'owner' })

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

    return (
        <HStack >
            <Tag>Total SVGies in Collection: {totalSupplyBN ? totalSupplyBN.toNumber() : `Loading...`}</Tag>
        </HStack>
    )
}

export default NFTInfo