import { Center } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import Card from './Card'
import { ethers } from 'ethers';
import SVGie from './SVGie';

const SVGieWrapper = (props) => {

    const { address, tokenId, width, height, variant, size, contractInfo, balance, setBalance } = props

    const { data: userBalance, error: errorBalance, isError: isErrorBalance, isLoading: isLoadingBalance, isFetched: isFetchedBalance } =
        useContractRead(contractInfo, 'balanceOf', { args: address, enabled: true })

    useEffect(() => {
        if (isLoadingBalance || !isFetchedBalance) return;

        if (isErrorBalance) {
            // showToast(`Couldn't load balancce`, 'error')
            console.log(errorBalance)
            return;
        }

        setBalance(userBalance.toNumber())

        if (!userBalance.toNumber()) {
            // showToast('You have not minted yours!', 'error')
            console.log(`balanceOf ${address} is 0`)
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userBalance, isErrorBalance, isLoadingBalance, isFetchedBalance]);


    return (
        <Card
            size={size}
            variant={variant}
        >
            {!balance ?
                <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' >
                    No SVGie found! 😢 <br />
                    Did you mint yours?
                </Center>
                :
                <SVGie
                    address={address}
                    tokenId={tokenId}
                    contractInfo={contractInfo}
                    balance={balance}
                    width={width}
                    height={height}
                />
            }
        </Card>
    )

}

export default SVGieWrapper;