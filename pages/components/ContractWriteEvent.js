import { useContext } from "react"
import { useContractEvent } from "wagmi"
import { Context } from "../Context"

const ContractWriteEvent = (props) => {

    const { eventNameFilterOnce = '', eventArgsCallback } = props
    const { contractInfo } = useContext(Context)

    useContractEvent(contractInfo, eventNameFilterOnce, eventArgsCallback, { once: true, },)

    return <></>
}

export default ContractWriteEvent