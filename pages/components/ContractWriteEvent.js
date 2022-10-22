import { useContext } from "react"
import { useContractEvent } from "wagmi"
import { Context } from "../Context"

const ContractWriteEvent = (props) => {

    const { eventNameFilterOnce = '', eventArgsCallback } = props
    const { addressOrName, contractInterface } = useContext(Context)
    useContractEvent({ addressOrName, contractInterface, eventName: eventNameFilterOnce, listener: eventArgsCallback, once: true })

    return <></>
}

export default ContractWriteEvent