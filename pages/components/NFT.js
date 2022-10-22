import { useContext } from "react"
import { Center, Divider, Flex, Heading, Skeleton, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { ethers } from 'ethers';

import { Context } from "../Context";

import Card from "./Card"
import SVGieWrapper from "./SVGieWrapper";
import MintNFT from "./MintNFT";
import NFTInfo from "./NFTInfo";
import NFTLinks from "./NFTLinks";
import OwnerTeamMint from "./OwnerTeamMint";

const NFT = () => {

    const cardVariant = useColorModeValue('shadowLight', 'shadowDark')
    const headingVariant = useColorModeValue('withShadowLight', 'withShadowDark')
    const cardSize = 'xl'

    const { address, isError, isLoading, isConnected } = useAccount()

    const { balance, loadingBalance, owner } = useContext(Context);

    return (
        <>
            <Center w='100%' h='32rem' >
                {(
                    isLoading ?
                        <Skeleton>
                            <Card size={cardSize} variant={cardVariant} >
                                <Flex w={300} h={300} />
                            </Card>
                        </Skeleton>
                        : isError ?
                            <Card size={cardSize} variant={cardVariant} >
                                <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                                    Error Loading Account
                                </Center>
                            </Card>
                            : (!isConnected || !address) ?
                                <Card size={cardSize} variant={cardVariant} >
                                    <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                                        Please Connect Wallet to Mint or View your SVGie
                                    </Center>
                                </Card>
                                :
                                <VStack >
                                    <Card size={cardSize} variant={cardVariant} >
                                        <SVGieWrapper
                                            address={address}
                                            tokenId={ethers.BigNumber.from(address)}
                                        />
                                    </Card>
                                    <Center >
                                        {(isConnected && !loadingBalance) ?
                                            !balance ?
                                                <MintNFT />
                                                :
                                                <NFTLinks
                                                    iconSize={10}
                                                    tokenId={ethers.BigNumber.from(address)}
                                                />
                                            :
                                            <></>
                                        }
                                    </Center>
                                    <NFTInfo />``
                                </VStack>
                )}
            </Center>
            {owner && owner === address && // Owner Buttons Section
                <VStack
                    pb='1em'
                >
                    <Divider />
                    <Heading
                        size='sm'
                        variant={headingVariant}
                    >
                        Owner Functions
                    </Heading>
                    <Center py='.5em'>
                        <OwnerTeamMint />
                    </Center>
                </VStack>


            }
        </>
    )

}

export default NFT