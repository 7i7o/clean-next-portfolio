import { useEffect, useState } from "react"
import { Button, Center, HStack, Skeleton, Tag, useColorModeValue, useToast, VStack } from "@chakra-ui/react"
import { useAccount, useContractRead, useContractWrite, useNetwork, useWaitForTransaction } from "wagmi"
import { BigNumber, ethers } from 'ethers';

import Card from "./Card"
import SVGie from "./SVGie"
import contractABI from "../../constants/contractABI.json"
import { contractNameOrAddress } from "../../constants/contract"

const NFTManager = (props) => {

    const { wrongNetwork } = props

    const { data: account, isError, isLoading } = useAccount()
    // const { activeChain, chains, error: errorNetwork, isLoading: isLoadingNetwork, pendingChainId, switchNetwork } = useNetwork()

    const cardVariant = useColorModeValue('shadowLight', 'shadowDark')

    const toast = useToast()

    const [nextPrice, setNextPrice] = useState()
    const [slowFactor, setSlowFactor] = useState()
    const [totalSupply, setTotalSupply] = useState()
    const [mintPrice, setMintPrice] = useState()
    const [mintActive, setMintActive] = useState()
    // const [wrongNetwork, setWrongNetwork] = useState(false)

    const contractInfo = { addressOrName: contractNameOrAddress, contractInterface: contractABI.abi, }

    const { data: mintPriceBN } = useContractRead(contractInfo, 'getPrice', {})
    const { data: nextPriceBN } = useContractRead(contractInfo, 'getNextPrice', {})
    const { data: slowFactorBN } = useContractRead(contractInfo, 'getSlowFactor', {})
    const { data: totalSupplyBN } = useContractRead(contractInfo, 'getTotalSupply', {})
    const { data: mintActiveResult } = useContractRead(contractInfo, 'isMintActive', {})
    // const contractWrite =
    const { data: mintTxReceipt, error: mintError, isError: mintIsError, isLoading: mintIsLoading, write } =
        useContractWrite(contractInfo, 'safeMint', { args: [account?.address] })
    // useContractWrite(contractInfo, 'safeMint', { args: [data?.address], value: BigNumber.from(mintPriceBN?mintPriceBN:0) })
    // const { data: mintTxReceipt, error: mintError, isError: mintIsError, isLoading: mintIsLoading } =
    //     useWaitForTransaction({ wait: contractWrite.data?.wait })

    // useEffect(
    //     () => {
    //         if (-1 != chains.findIndex(x => { x.id === activeChain?.id })) setWrongNetwork(true)
    //         else setWrongNetwork(false)
    //     }, [data, activeChain])

    useEffect(() => {
        // console.log('price is: ', ethers.utils.formatEther(mintPriceBN))
        if (!mintPriceBN) return;
        setMintPrice(ethers.utils.formatEther(mintPriceBN))
    }, [mintPriceBN])

    useEffect(() => {
        // console.log('nextPrice is: ', nextPriceBN)
        if (!nextPriceBN) return;
        setNextPrice(ethers.utils.formatEther(nextPriceBN))
    }, [nextPriceBN])

    useEffect(() => {
        // console.log('slowFactor is: ', slowFactorBN)
        if (!slowFactorBN) return;
        setSlowFactor(slowFactorBN.toNumber())
    }, [slowFactorBN])

    useEffect(() => {
        // console.log('totalSupply is: ', totalSupplyBN)
        if (!totalSupplyBN) return;
        setTotalSupply(totalSupplyBN.toNumber())
    }, [totalSupplyBN])

    useEffect(() => {
        // console.log('totalSupply is: ', totalSupplyBN)
        // if (!mintActiveResult) return;
        setMintActive(mintActiveResult)
    }, [mintActiveResult])

    useEffect(() => {
        if (mintIsLoading) return;

        if (mintIsError) {
            console.log('Minting Error: ', mintError)
            toast({
                title: `Error minting your SVGie`,
                status: 'error',
                isClosable: true,
            })
        }

        if (!mintTxReceipt) return

        console.log(mintTxReceipt)
        // toast({
        //   title: `You minted your SVGie!`,
        //   status: 'success',
        //   isClosable: true,
        // })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mintTxReceipt, mintError, mintIsError, mintIsLoading])

    return (
        <Center w='100%' h='32rem' >
            {(
                isLoading ?
                    <Skeleton>
                        <Card
                            size='xl'
                            // variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                            variant={cardVariant}
                        />
                    </Skeleton>
                    : isError ?
                        <Card
                            size='xl'
                            // variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                            variant={cardVariant}
                        >
                            <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                                Error Loading Account
                            </Center>
                        </Card>
                        : !account ?
                            <Card
                                size='xl'
                                // variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                                variant={cardVariant}
                            >
                                <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' p={16}>
                                    Please Connect Wallet to Mint or View your SVGie
                                </Center>
                            </Card>
                            : <VStack >
                                {/* <>Account: {data?.address}</> */}
                                <SVGie
                                    address={account?.address}
                                    tokenId={ethers.BigNumber.from(account?.address)}
                                    size='xl'
                                    // variant={colorMode === 'light' ? 'shadowLight' : 'shadowDark'}
                                    variant={cardVariant}
                                />
                                <Center >
                                    <Button
                                        disabled={!mintActive || mintIsLoading || wrongNetwork}
                                        onClick={() => {
                                            console.log(mintPriceBN)
                                            console.log(ethers.utils.formatEther(mintPriceBN))
                                            console.log(BigNumber.from(mintPriceBN).toString())

                                            // write({ args: [data?.address], value: BigNumber.from(mintPriceBN) })
                                            write()
                                            // contractWrite.write()
                                        }
                                            // toast({
                                            //   title: `Coming Soon`,
                                            //   status: toastStatus,
                                            //   isClosable: true,
                                            // })
                                        }
                                    >
                                        Mint ({mintActive ? `${mintPrice} MATIC` : 'SOON'})
                                    </Button>
                                </Center>
                                <HStack >
                                    <Tag>Next Price in {!nextPrice || !slowFactor ? 0 : nextPrice * slowFactor - totalSupply} mints</Tag>
                                    <Tag>Next Price: {nextPrice} MATIC</Tag>
                                    <Tag>Delay ratio: {slowFactor}</Tag>
                                </HStack>
                                <Center pl='3em' pr='3em' align={'center'} pb={0}>
                                    The Price follows a flattened Fibonacci curve, related to the amount of NFTs minted
                                </Center>

                            </VStack>
            )}
        </Center>

    )

}

export default NFTManager