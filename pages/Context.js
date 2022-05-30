import React, { useState } from "react";

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {

    const [wrongNetwork, setWrongNetwork] = useState(true)
    const [mainnetProvider, setMainnetProvider] = useState()
    const [ensName, setEnsName] = useState()
    const [ensAvatar, setEnsAvatar] = useState()

    return (
        <Context.Provider
            value={{
                wrongNetwork, setWrongNetwork,
                mainnetProvider, setMainnetProvider,
                ensName, setEnsName,
                ensAvatar, setEnsAvatar,
            }}
        >
            {children}
        </Context.Provider>
    )
}
