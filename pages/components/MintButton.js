import { Button, useToast } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useContractEvent, useContractWrite } from "wagmi"

const MintButton = (props) => {

    const { wrongNetwork, mintCallback, mintActive, mintPrice, balance, contractInfo, address } = props
    const toast = useToast()
    const router = useRouter()
    const [minting, setMinting] = useState(false)

    const { data, error, isError, isLoading, write } =
        useContractWrite(contractInfo, mintCallback, { args: [address], overrides: { value: mintPrice } },)
    // useContractWrite(contractInfo, 'safeMint', { args: [address], overrides: { value: mintPrice } },)

    const { } = useContractEvent(contractInfo, 'Transfer', e => reloadOnMint(e), { once: true, },)

    const reloadOnMint = e => {
        console.log(e)
        console.log(address)
        if (e[1] === address) {
            router.reload(window.location.pathname)
        } else {
            console.log("Not reloading because event topic doesn't match address")
        }

    }

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
            toast({ title: `Mint submitted! Check your wallet for transaction confirmation`, status: 'info', isClosable: true, })
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