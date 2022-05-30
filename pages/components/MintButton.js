import { Button, useToast } from "@chakra-ui/react"
import { BigNumber, ethers } from "ethers"


const MintButton = (props) => {

    const { wrongNetwork, mintActive, mintPrice, balance } = props
    const toast = useToast()

    return (
        <Button
            colorScheme='blue'
            disabled={!mintActive || wrongNetwork} //|| mintIsLoading }
            onClick={() => {
                toast({
                    title: `Coming Soon`,
                    status: 'info',
                    isClosable: true,
                })
            }
            }
        >
            Mint({mintActive ? (mintPrice ? `${ethers.utils.formatEther(mintPrice)} MATIC` : '') : 'SOON'})
        </Button >

    )
}

export default MintButton