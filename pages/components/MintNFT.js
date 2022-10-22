import { Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useAccount,
} from 'wagmi'
import { ethers } from "ethers"
import { Context } from '../Context'
// import NFTLinks from './NFTLinks'

const MintNFT = () => {
    const { addressOrName, contractInterface, balance, mintActive, mintPrice } = useContext(Context)
    const { address } = useAccount()
    const router = useRouter();
    const toast = useToast()

    const overrides = { value: mintPrice }

    // const { config, error: prepareError, isError: isPrepareError, } =
    //     usePrepareContractWrite({ addressOrName, contractInterface, functionName: 'safeMint', args: [address], overrides })

    const { data, error, isError, write } =
        useContractWrite({ addressOrName, contractInterface, functionName: 'safeMint', args: [address], overrides })

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    const reloadPage = () => {
        router.reload(window.location.pathname)
    }

    /** Message for Mint Starting **/
    useEffect(() => {
        if (!isLoading) return;
        toast({ title: `Minting...`, status: 'info', isClosable: true, })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    /** Message for Mint Successful **/
    useEffect(() => {
        if (!isSuccess) return;
        console.log(`Successfully Minted SVGie!`)
        toast({ title: `Mint Successful! Check you wallet for transaction confirmation`, status: 'success', isClosable: true, })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    /** Message for Mint Error **/
    useEffect(() => {
        if (!error) return
        toast({ title: `Mint Failed, please check console`, status: 'error', isClosable: true, })
        console.log(`Mint Error: ${JSON.stringify((error)?.message)}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError])

    /** Component **/
    return (
        <div>
            {(!balance && !isSuccess) &&
                <Button
                    colorScheme='blue'
                    disabled={!write || isLoading}
                    onClick={() => write()}
                    isLoading={isLoading}
                    loadingText={`Minting...`}
                >
                    {`${mintActive ? (mintPrice ? `Mint (${ethers.utils.formatEther(mintPrice)} ETH)` : 'Free Mint') : 'Mint (SOON)'}`}
                </Button>
            }
            {isSuccess &&
                <Button
                    mx={2}
                    colorScheme='blue'
                    onClick={reloadPage}
                >
                    Reload to reveal
                </Button>
            }
        </div>
    )
}

export default MintNFT