import { Box, Center, Skeleton, useToast, useStyleConfig } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { contractNameOrAddress } from "../../constants/contract"
import contractABI from "../../constants/contractABI.json"
import InlineSVG from 'svg-inline-react';
import { ethers } from 'ethers'
import Card from './Card'
// 0x0b29CF9b4D48BF75Bd1c2681cA07aB102F85c98C
// const SVGie = ({ address, tokenId, width, height }) => {
const SVGie = (props) => {

    const { address, tokenId, width, height, variant, size, ...rest } = props

    // const styles = useStyleConfig('SVGie', { size, variant })

    const [decodedURIImage, setDecodedURIImage] = useState('')

    // const [svgieData, setSvgieData] = useState('')
    // const [isError, setIsError] = useState(false)
    // const [isLoading, setIsLoading] = useState(true)


    const toast = useToast()
    const showToast = (title, status = 'info') => toast({ title, status, isClosable: true })

    const contractInfo = { addressOrName: contractNameOrAddress, contractInterface: contractABI.abi, }

    const { data: balance, error: errorBalance, isError: isErrorBalance, isLoading: isLoadingBalance, isFetched: isFetchedBalance } =
        useContractRead(contractInfo, 'balanceOf', { args: address, enabled: true })

    useEffect(() => {
        if (isLoadingBalance || !isFetchedBalance) return;

        if (isErrorBalance) {
            // showToast(`Couldn't load balancce`, 'error')
            console.log(errorBalance)
            return;
        }
        
        if (!balance) {
            showToast('You have not minted yours!', 'error')
            console.log(`balanceOf ${address} is 0`)
            return;
        }
        
        // console.log(contractRead)
        // setSvgieData(contractRead)
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [balance, isErrorBalance, isLoadingBalance, isFetchedBalance]);
    
    
    const {data, error, isError, isLoading, isFetched } = 
        useContractRead(contractInfo, 'tokenURI', { args: tokenId, enabled: true })

    useEffect(() => {
        // const {data, error, isError, isLoading, isFetched } = svgieData

        if (isLoading || !isFetched) return;

        // setIsLoading(false);

        if (isError) {
            // showToast(`Couldn't load SVGie`, 'error')
            console.log(error)
            // setIsError(error)
            return;
        }

        if (!data) {
            showToast('No Data on SVGie retrieved!', 'error')
            console.log('No Data on SVGie retrieved!')
            return;
        }

        const json = JSON.parse(window.atob(data.substring(data.indexOf(',') + 1)));
        const decodedImg = window.atob(json.image.substring(json.image.indexOf(',') + 1));
        setDecodedURIImage(decodedImg);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error, isError, isFetched, isLoading]);

    // Check Decoded Image
    // useEffect(()=>{
    //     if (!decodedURIImage) return
    //     console.log(decodedURIImage)
    // },[decodedURIImage])

    return (
        <Card
            size={size}
            variant={variant}
        >
            {!balance || isError ?
                // <Center>You have not minted your SVGie yet</Center>
                <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' >
                    No SVGie found! 😢<br />Did you mint yours?
                </Center>
                :
                isLoading ?
                    <Skeleton>
                        Loading...
                    </Skeleton>
                    :
                    <InlineSVG src={decodedURIImage} element='span' width={width} height={height} />}
        </Card>
    )

}

export default SVGie;