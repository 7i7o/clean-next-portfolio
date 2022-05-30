import { Center, Skeleton, useToast } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import InlineSVG from 'svg-inline-react';

const SVGie = (props) => {

    const { address, tokenId, contractInfo, balance, width, height } = props

    const [decodedURIImage, setDecodedURIImage] = useState('')

    const toast = useToast()
    const showToast = (title, status = 'info') => toast({ title, status, isClosable: true })

    const { data, error, isError, isLoading, isFetched } =
        useContractRead(contractInfo, 'tokenURI', { args: tokenId, enabled: true })

    useEffect(() => {
        if (isLoading || !isFetched) return;

        if (isError) {
            console.log(error)
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
        <>
            {!balance || isError ?
                <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' >
                    No SVGie found! 😢 <br />
                    Did you mint yours?
                </Center>
                :
                isLoading ?
                    <Skeleton>
                        Loading...
                    </Skeleton>
                    :
                    <InlineSVG src={decodedURIImage} element='span' width={width} height={height} />}
        </>
    )

}

export default SVGie;