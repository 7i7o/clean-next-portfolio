import React from 'react';

import { useColorModeValue } from "@chakra-ui/react";

import { chain, createClient, WagmiProvider } from 'wagmi';
import { apiProvider, configureChains, getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
    // [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
    // [chain.polygon],
    [chain.polygonMumbai],
    [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);
const { connectors } = getDefaultWallets({ appName: 'SVGies', chains });
const wagmiClient = createClient({ autoConnect: true, connectors, provider })

const WalletConnector = ({ Component, pageProps }) => {
    const walletTheme = useColorModeValue(lightTheme(), darkTheme())
    return (
        <WagmiProvider client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={walletTheme} >
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiProvider>
    )
}

export default WalletConnector
