import { useState } from "react"
import { Center, Skeleton, useColorModeValue, VStack } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { ethers } from 'ethers';

import Card from "./Card"
import NFTInfo from "./NFTInfo";
import MintButton from "./MintButton";
import SVGie from "./SVGie"

import contractABI from "../../constants/contractABI.json"
import { contractNameOrAddress } from "../../constants/contract"
import NFTLinks from "./NFTLinks";
import SVGieWrapper from "./SVGieWrapper";

const NFTManager = (props) => {

    const { wrongNetwork } = props

    const contractInfo = {
        addressOrName: contractNameOrAddress,
        contractInterface: contractABI.abi,
    }

    const cardVariant = useColorModeValue('shadowLight', 'shadowDark')

    const { data: account, isError, isLoading } = useAccount()

    const [mintActive, setMintActive] = useState()
    const [mintPrice, setMintPrice] = useState()
    const [balance, setBalance] = useState()

    return (
        <Center w='100%' h='32rem' >
            {(
                isLoading ?
                    <Skeleton>
                        <Card
                            size='xl'
                            variant={cardVariant}
                        />
                    </Skeleton>
                    : isError ?
                        <Card
                            size='xl'
                            variant={cardVariant}
                        >
                            <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                                Error Loading Account
                            </Center>
                        </Card>
                        : !account ?
                            <Card
                                size='xl'
                                variant={cardVariant}
                            >
                                <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                                    Please Connect Wallet to Mint or View your SVGie
                                </Center>
                            </Card>
                            : <VStack >
                                <SVGieWrapper
                                    address={account?.address}
                                    tokenId={ethers.BigNumber.from(account?.address)}
                                    size='xl'
                                    variant={cardVariant}
                                    contractInfo={contractInfo}
                                    balance={balance}
                                    setBalance={setBalance}
                                />
                                <Center >
                                    {balance ?
                                        <NFTLinks
                                            iconSize={10}
                                            address={account?.address}
                                            tokenId={ethers.BigNumber.from(account?.address)}
                                            balance={balance}
                                        />
                                        :
                                        <MintButton
                                            mintActive={mintActive}
                                            mintPrice={mintPrice}
                                            wrongNetwork={wrongNetwork}
                                            balance={balance}
                                            contractInfo={contractInfo}
                                            address={account?.address}
                                            tokenId={ethers.BigNumber.from(account?.address)}
                                        />
                                    }
                                </Center>
                                <NFTInfo
                                    setMintActive={setMintActive}
                                    setMintPrice={setMintPrice}
                                    contractInfo={contractInfo}
                                />
                                <Center pl='3em' pr='3em' align={'center'} pb={0}>
                                    The Price follows a flattened Fibonacci curve, related to the amount of NFTs minted
                                </Center>

                            </VStack>
            )}
        </Center>

    )

}

export default NFTManager