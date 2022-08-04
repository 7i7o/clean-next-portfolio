import { useContext } from "react"
import { Center, Divider, Heading, Skeleton, useColorModeValue, VStack } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { ethers } from 'ethers';

import Card from "./Card"
import NFTInfo from "./NFTInfo";
import MintButton from "./MintButton";

// import contractABI from "../../constants/contractABI.json"
// import { contractNameOrAddress } from "../../constants/contract"
import NFTLinks from "./NFTLinks";
import SVGieWrapper from "./SVGieWrapper";
import { Context } from "../Context";
import OwnerTeamMint from "./OwnerTeamMint";

const NFTMinter = () => {

    const {
        balance, owner,
    } = useContext(Context);

    // const contractInfo = {
    //     addressOrName: contractNameOrAddress,
    //     contractInterface: contractABI.abi,
    // }

    const headingVariant = useColorModeValue('withShadowLight', 'withShadowDark')
    const cardVariant = useColorModeValue('shadowLight', 'shadowDark')
    const cardSize = 'xl'

    const { data: account, isError, isLoading } = useAccount()

    // const [mintActive, setMintActive] = useState()
    // const [mintPrice, setMintPrice] = useState()
    // const [balance, setBalance] = useState()
    // const [owner, setOwner] = useState()
    // const [teamAddress, setTeamAddress] = useState('')

    return (
        <>
            <Center w='100%' h='32rem' >
                {(
                    isLoading ?
                        <Skeleton>
                            <Card size={cardSize} variant={cardVariant} />
                        </Skeleton>
                        : isError ?
                            <Card size={cardSize} variant={cardVariant} >
                                <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                                    Error Loading Account
                                </Center>
                            </Card>
                            : !account ?
                                <Card size={cardSize} variant={cardVariant} >
                                    <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                                        Please Connect Wallet to Mint or View your SVGie
                                    </Center>
                                </Card>
                                :
                                <VStack >
                                    <Card size={cardSize} variant={cardVariant} >
                                        <SVGieWrapper
                                            address={account?.address}
                                            tokenId={ethers.BigNumber.from(account?.address)}
                                        />
                                    </Card>
                                    <Center >
                                        {balance ?
                                            <NFTLinks
                                                iconSize={10}
                                                tokenId={ethers.BigNumber.from(account?.address)}
                                            />
                                            :
                                            <MintButton
                                                mintCallback='safeMint'
                                                address={account?.address}
                                            />
                                        }

                                    </Center>
                                    <NFTInfo />
                                    {/* <Center pl='3em' pr='3em' align={'center'} pb={0}>
                                        The Price follows a flattened Fibonacci curve, related to the amount of NFTs minted
                                    </Center> */}

                                </VStack>
                )}
            </Center>
            {owner === account?.address && // Owner Buttons Section
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
                        {/* <MintButton
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
                        */}
                    </Center>
                </VStack>


            }
        </>
    )

}

export default NFTMinter