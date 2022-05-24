import { Box, Center, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { contractNameOrAddress } from "../../constants/contract"
import contractABI from "../../constants/contractABI.json"
import InlineSVG from 'svg-inline-react';
import { useToast } from '@chakra-ui/react';
import { ethers } from 'ethers'
// 0x0b29CF9b4D48BF75Bd1c2681cA07aB102F85c98C
const SVGie = ({ address, tokenId, width, height }) => {

    const [decodedURIImage, setDecodedURIImage] = useState('')

    const toast = useToast()
    const [tokenURI, setTokenURI] = useState('')

    const contractInfo = { addressOrName: contractNameOrAddress, contractInterface: contractABI.abi, }

    // const { data: balance, isError: isErrorBalance, isLoading: isLoadingBalance, isFetched } =
    //     useContractRead(contractInfo, 'balanceOf', { args: address })

    const { data, error, isError, isLoading, isFetched } =
        useContractRead(contractInfo, 'tokenURI', { args: tokenId, enabled: true })

    const showToast = (title, status = 'info') => toast({ title, status, isClosable: true })

    useEffect(() => {
        if (isLoading || !isFetched) return;

        if (isError) {
            console.log(error)
            showToast(`No SVGie found!`, 'error')
            return;
        }

        console.log('TokenId: ', tokenId.toString())

        if (!data) {
            showToast('No Data!', 'error')
            console.log('No Data!')
            return;
        }

        const json = JSON.parse(window.atob(data.substring(data.indexOf(',') + 1)));
        const decodedImg = window.atob(json.image.substring(json.image.indexOf(',') + 1));
        setDecodedURIImage(decodedImg);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isError, isLoading]);


    return (
        isError ?
            // <Center>You have not minted your SVGie yet</Center>
            <Center align='center' color='#303030'>No SVGie found!<br/>Did you mint yours?</Center>
            :
            isLoading ?
                <Skeleton>
                    <Center
                        boxSize={240}
                        bg='#ffffffcc'
                        borderRadius={'.75em'}
                        _hover={{ boxShadow: '0 0 8px #ff0080', bg: '#ffffffee' }}
                    >
                        <Box w={200} h={200} >
                            Loading...
                        </Box>
                    </Center>
                </Skeleton>
                :
                <Center
                    boxSize={240}
                    bg='#ffffffcc'
                    borderRadius={'.75em'}
                    _hover={{ boxShadow: '0 0 8px #ff0080', bg: '#ffffffee' }}
                >
                    <InlineSVG src={decodedURIImage} element='div' className='svgieContainer' width={width} height={height} />
                </Center>
    )

}

export default SVGie;