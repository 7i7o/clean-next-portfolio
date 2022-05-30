import { useState } from "react"
import { Center, Divider, Heading, Input, Skeleton, useColorModeValue, VStack } from "@chakra-ui/react"
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
    const headingVariant = useColorModeValue('withShadowLight', 'withShadowDark')

    const { data: account, isError, isLoading } = useAccount()

    const [mintActive, setMintActive] = useState()
    const [mintPrice, setMintPrice] = useState()
    const [balance, setBalance] = useState()
    const [owner, setOwner] = useState()
    const [teamAddress, setTeamAddress] = useState('')

    return (
        <>
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
                                                mintCallback='safeMint'
                                                mintActive={mintActive}
                                                mintPrice={mintPrice}
                                                wrongNetwork={wrongNetwork}
                                                balance={balance}
                                                contractInfo={contractInfo}
                                                address={account?.address}
                                            // tokenId={ethers.BigNumber.from(account?.address)}
                                            />
                                        }

                                    </Center>
                                    <NFTInfo
                                        setMintActive={setMintActive}
                                        setMintPrice={setMintPrice}
                                        setOwner={setOwner}
                                        contractInfo={contractInfo}
                                    />
                                    <Center pl='3em' pr='3em' align={'center'} pb={0}>
                                        The Price follows a flattened Fibonacci curve, related to the amount of NFTs minted
                                    </Center>

                                </VStack>
                )}
            </Center>
            {owner === account?.address &&
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
                        <MintButton
                            mintCallback='teamMint'
                            mintActive={true}
                            mintPrice={0}
                            wrongNetwork={wrongNetwork}
                            balance={0}
                            contractInfo={contractInfo}
                            address={teamAddress}
                        // tokenId={teamAddress ? ethers.BigNumber.from(teamAddress) : ''}
                        />
                        <Input
                            placeholder='0x...'
                            value={teamAddress}
                            onChange={e => setTeamAddress(e.target.value)}
                        />
                    </Center>
                </VStack>


            }
        </>
    )

}

export default NFTManager