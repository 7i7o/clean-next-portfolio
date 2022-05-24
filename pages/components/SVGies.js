import { keccak256 } from "ethers/lib/utils"
import { useState, useEffect } from 'react'

const SVGies = ({ address, width, height, fill }) => {

    const [addr, setAddr] = useState()
    const [paths, setPaths] = useState()
    const [c, setC] = useState() // colors

    const fixOpacity = (hexString) => {
        const data = hexString.length == 8 ? hexString : hexString.length == 6 ? hexString + 'ff' : 'ffffffff'
        return data?.slice(0, 6) + parseInt((parseInt(data?.slice(6, 8), 16) * 256 / 1024) + 191).toString(16)
    }

    // Creates a path from an array with all the control points defined
    const getSPath = (arr) => {
        // First coordinates are the path start point
        let path = `M${arr[0]} ${arr[1]}`
        // Every 2 coordinate pair, a Cubic Bézier S Curve goes into the path
        path += `C${arr[2]} ${arr[3]} ${arr[4]} ${arr[5]} ${arr[6]} ${arr[7]}`
        for (let i = 8; i < arr.length; i += 4) {
            path += `S${arr[i]} ${arr[i + 1]} ${arr[i + 2]} ${arr[i + 3]}`
        }
        // Last coordinate pair is used as control point for the last Bézier Curve
        // path += `S${2 * arr[0] - arr[2]} ${2 * arr[1] - arr[3]} ${arr[0]} ${arr[1]}z`
        path += `Q${2 * arr[arr.length - 2] - arr[arr.length - 4]} ${2 * arr[arr.length - 1] - arr[arr.length - 3]} ${arr[0]} ${arr[1]}z`
        return path
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => address && address !== addr && setAddr(address), [address])
    useEffect(() => {
        // Split hex data into groups of 4 bytes to create rgba colors
        const getColors = (hexData) => {
            const colors = hexData?.slice(2).match(/.{1,8}/g) || [];
            return colors.map(hex => fixOpacity(hex))
        }

        const getSPaths = (ethAddress) => {
            const arr = ethAddress?.substring(2).split('').map(
                char => parseInt(char, 16) + 8
            )
            let symArr = arr?.map((val, index) => (index % 2) ? val : 32 - val)
            return [getSPath(arr), getSPath(symArr)]
        }

        if (addr) {
            let hash = keccak256(addr)
            // console.log(hash)
            let newColors = getColors(hash)
            // console.log(newColors)
            setC(newColors)
            setPaths(getSPaths(addr))
        }

    }, [addr])

    if (!addr || !paths || !c) return <p>Loading SVGies...</p>

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={width} height={height}>
            <radialGradient id={`${c[0]}${c[1]}`}>
                <stop stopColor={`#${c[0]}`} offset="0" />
                <stop stopColor={`#${c[1]}`} offset="1" />
            </radialGradient>
            <rect width="100%" height="100%" opacity="1" fill="white" />
            <rect width="100%" height="100%" opacity=".5" fill={`url(#${c[0]}${c[1]})`} />

            <linearGradient id={`${c[2]}${c[3]}${c[2]}`}>
                <stop stopColor={`#${c[2]}`} offset="0" />
                <stop stopColor={`#${c[3]}`} offset=".5" />
                <stop stopColor={`#${c[2]}`} offset="1" />
            </linearGradient>
            <linearGradient id={`${c[3]}${c[2]}${c[3]}`}>
                <stop stopColor={`#${c[3]}`} offset="0" />
                <stop stopColor={`#${c[2]}`} offset=".5" />
                <stop stopColor={`#${c[3]}`} offset="1" />
            </linearGradient>
            <path
                fill={`url(#${c[2]}${c[3]}${c[2]})`}
                strokeWidth={.1}
                stroke={`url(#${c[3]}${c[2]}${c[3]})`}
                d={`${paths[0]}${paths[1]}`}
            />
        </svg>
    )

}

export default SVGies