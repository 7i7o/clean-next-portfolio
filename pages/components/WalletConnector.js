import React from 'react';

import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { useColorModeValue } from "@chakra-ui/react";

const WalletConnector = ({ Component, pageProps }) => {
    const { chains, provider } = configureChains(
        // [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
        // [chain.polygon],
        [chain.polygonMumbai],
        [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
    );
    const { connectors } = getDefaultWallets({ appName: 'SVGies', chains });
    const wagmiClient = createClient({ autoConnect: true, connectors, provider })
    const walletTheme = useColorModeValue(lightTheme, darkTheme)
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={walletTheme()} >
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default WalletConnector
