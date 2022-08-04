import { Center } from '@chakra-ui/react'

import { useContext, useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import SVGie from './SVGie';
import { Context } from '../Context';

const SVGieWrapper = (props) => {

    const { address, tokenId } = props
    const { contractInfo, balance, setBalance } = useContext(Context);

    const [waitForBalance, setWaitForBalance] = useState(true)
    const [tokenIdBuffer, setTokenIdBuffer] = useState()

    const { data: userBalance, error: errorBalance, isError: isErrorBalance, isLoading: isLoadingBalance, isFetched: isFetchedBalance } =
        useContractRead(contractInfo, 'balanceOf', { args: address, enabled: true })

    useEffect(() => {
        if (isLoadingBalance || !isFetchedBalance) return;

        if (isErrorBalance) {
            console.log(errorBalance)
            return;
        }

        console.log(`balanceOf ${address} is ${userBalance.toNumber()}`)
        setBalance(userBalance.toNumber())
        setWaitForBalance(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userBalance, isErrorBalance, isLoadingBalance, isFetchedBalance]);

    useEffect(() => {
        setWaitForBalance(true)
    }, [tokenId])

    useEffect(() => {
        if (waitForBalance) return
        if (tokenId !== tokenIdBuffer)
            setTokenIdBuffer(tokenId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waitForBalance])

    return !balance ?
        <Center align='center' color='#303030' textShadow='0 0 3px #cccccc' >
            No SVGie found! 😢 <br />
            Did you mint yours?
        </Center>
        :
        waitForBalance || tokenId !== tokenIdBuffer ?
            <Center align='center' color='#303030' textShadow='0 0 3px #cccccc'>
                Loading...
            </Center >
            :
            <SVGie
                address={address}
                tokenId={tokenIdBuffer}
                fetchOnLoad={!waitForBalance}
                contractInfo={contractInfo}
                balance={balance}
            />

}

export default SVGieWrapper;