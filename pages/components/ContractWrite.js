import { Button, useToast } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi"
import { Context } from "../Context"
import ContractWriteEvent from "./ContractWriteEvent"

const ContractWrite = (props) => {

    const { buttonDisabled, buttonText, buttonLoadingText, txCallback, argsArray, overridesObj, eventNameFilterOnce = '', eventArgsCallback, buttonPressCount = 0, setButtonPressCount = () => { } } = props
    const { addressOrName, contractInterface } = useContext(Context)
    const { isConnected } = useAccount()

    const toast = useToast()
    // const router = useRouter()
    const [transacting, setTransacting] = useState(false)

    const { config } = usePrepareContractWrite({
        addressOrName, contractInterface, functionName: txCallback,
        args: argsArray, overrides: overridesObj
    })
    const { data, error, write, status } = useContractWrite(config)

    const sendTransaction = async () => {
        setTransacting(true)
        toast({ title: `Sending ${txCallback} Tx...`, status: 'info', isClosable: true, })
        setButtonPressCount(buttonPressCount + 1)
        write?.()
    }

    useEffect(() => {
        if (status === 'idle' || status === 'loading') return;

        if (status === 'error') {
            setButtonPressCount(buttonPressCount - 1)
            setTransacting(false)
            toast({ title: `Tx ${txCallback} Failed, please check console`, status: 'error', isClosable: true, })
            console.log(`Tx ${txCallback} Error: ${JSON.stringify(error)}`)
            return
        }

        if (status === 'success')
            console.log(`Tx ${txCallback} Sent! Response: ${JSON.stringify(data)}`)

        toast({ title: `${txCallback} Success! Check you wallet for transaction confirmation`, status: 'success', isClosable: true, })

        // eslint-disable-next-line react-hooks/exhaustive-deps
        buttonLoadingText = `${buttonText} success`
        // const txResult = data.wait()

        // if (txResult.status !== 1) {
        //     console.log(`${txCallback} Error: ${JSON.stringify(txResult.error)}`)
        //     console.log(`${txCallback} Tx Receipt: ${JSON.stringify(txResult)}`)
        //     toast({ title: `${txCallback} failed! Please try again`, status: 'error', isClosable: true, })
        //     setTransacting(false)
        //     return
        // }

        // toast({ title: `${txCallback} Success! Wait a few moments to see it in your block explorer.`, status: 'success', isClosable: true, })
        // console.log(`${txCallback} Receipt: ${JSON.stringify(txResult)}`)

        // setTransacting(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])


    return (
        <>
            <Button
                colorScheme='blue'
                disabled={!isConnected || transacting || buttonDisabled || !write}
                onClick={sendTransaction}
                isLoading={transacting}
                loadingText={`${buttonLoadingText}`}
            >
                {buttonText}
            </Button >
            {eventNameFilterOnce &&
                <ContractWriteEvent
                    eventNameFilterOnce={eventNameFilterOnce}
                    eventArgsCallback={eventArgsCallback}
                />
            }
        </>
    )
}

export default ContractWrite