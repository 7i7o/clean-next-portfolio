import { Button, useToast } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useContractWrite } from "wagmi"

const MintButton = (props) => {

    const { wrongNetwork, mintActive, mintPrice, balance, contractInfo, address, tokenId } = props
    const toast = useToast()
    const [minting, setMinting] = useState(false)

    const { data, error, isError, isLoading, write } =
        useContractWrite(contractInfo, 'safeMint', { args: [address], overrides: { value: mintPrice } },)

    useEffect(() => {

        if (!minting || isLoading) return

        if (isError) {
            toast({ title: `Minting Failed, please check console`, status: 'error', isClosable: true, })
            console.log('Minting Error: ', error)
            setMinting(false)
            return
        }

        if (data) {
            console.log('Mint Transaction Response: ', data)
            const txResult = data.wait()
            console.log('Mint Transaction Receipt: ', txResult)
            toast({ title: `Mint successful! Please refresh to unveil your NFT`, status: 'success', isClosable: true, })
            setMinting(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error, isError, isLoading])

    return (
        <Button
            colorScheme='blue'
            disabled={!mintActive || wrongNetwork || minting || balance}
            onClick={() => {
                setMinting(true)
                toast({ title: `Calling Contract Mint...`, status: 'info', isClosable: true, })
                write()
            }}
            isLoading={minting}
            loadingText='Minting'
        >
            {`Mint(${mintActive ? (mintPrice ? `${ethers.utils.formatEther(mintPrice)} MATIC` : '') : 'SOON'})`}
        </Button >
    )
}

export default MintButton