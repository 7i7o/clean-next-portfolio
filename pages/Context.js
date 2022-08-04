import React, { useState } from "react";
import { contractNameOrAddress } from "../constants/contract";
import contractABI from "../constants/contractABI.json"

export const Context = React.createContext();

const ContextProvider = ({ children }) => {

    const [wrongNetwork, setWrongNetwork] = useState(true)
    const [mainnetProvider, setMainnetProvider] = useState()
    const [ensName, setEnsName] = useState()
    const [ensAvatar, setEnsAvatar] = useState()
    const [contractRead, setContractRead] = useState()
    const [contractWrite, setContractWrite] = useState()
    const [mintActive, setMintActive] = useState()
    const [mintPrice, setMintPrice] = useState()
    const [nextPrice, setNextPrice] = useState()
    const [balance, setBalance] = useState()
    const [owner, setOwner] = useState()
    const contractInfo = {
        addressOrName: contractNameOrAddress,
        contractInterface: contractABI.abi,
    }

    return (
        <Context.Provider
            value={{
                contractInfo,
                wrongNetwork, setWrongNetwork,
                mainnetProvider, setMainnetProvider,
                ensName, setEnsName,
                ensAvatar, setEnsAvatar,
                contractRead, setContractRead,
                contractWrite, setContractWrite,
                mintActive, setMintActive,
                mintPrice, setMintPrice,
                nextPrice, setNextPrice,
                balance, setBalance,
                owner, setOwner,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default ContextProvider