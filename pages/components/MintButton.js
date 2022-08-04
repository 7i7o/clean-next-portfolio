import { Button, useToast } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { Context } from "../Context"
import ContractWrite from "./ContractWrite"

const MintButton = (props) => {

    const { mintCallback, address } = props
    const { mintActive, mintPrice, balance } = useContext(Context)

    const router = useRouter()

    const [showReloadButton, setShowReloadButton] = useState(false)
    const [buttonPressCount, setButtonPressCount] = useState(0)


    const txCallback = mintCallback
    const argsArray = [address]
    const overridesObj = { value: mintPrice }

    const eventNameFilterOnce = 'Transfer'
    const eventArgsCallback = e => {
        if (!e || e.length < 2) {
            console.log('Event data: ', e)
            return
        }

        if (e[1] !== address) {
            console.log("Not reloading because event topic doesn't match address")
            return
        }

        setShowReloadButton(true)
    }

    const reloadPage = () => {
        router.reload(window.location.pathname)
    }

    return (
        <>
            <ContractWrite
                buttonDisabled={!mintActive || balance || buttonPressCount}
                // buttonText={`Mint (${mintActive ? (mintPrice ? `${ethers.utils.formatEther(mintPrice)} MATIC` : 'Free') : 'SOON'})`}
                buttonText={`${mintActive ? (mintPrice ? `Mint (${ethers.utils.formatEther(mintPrice)} ETH)` : 'Free Mint') : 'Mint (SOON)'}`}
                buttonLoadingText={`Minting...`}
                txCallback={txCallback}
                argsArray={argsArray}
                overridesObj={overridesObj}
                eventNameFilterOnce={eventNameFilterOnce}
                eventArgsCallback={eventArgsCallback}
                buttonPressCount={buttonPressCount}
                setButtonPressCount={setButtonPressCount}
            />
            {showReloadButton &&
                <Button
                    mx={2}
                    colorScheme='blue'
                    onClick={reloadPage}
                >
                    Reload to reveal
                </Button>
            }
        </>
    )
}

export default MintButton