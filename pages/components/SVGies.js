import { keccak256 } from "ethers/lib/utils"

const SVGies = ({address, width, height, fill}) => {

    // Create an rgba string for setting colors in SVG Gradients
    const getRGBAString = (hexString) => {
        const data = hexString.length == 8 ? hexString : hexString.length == 6 ? hexString + 'ff' : 'ffffffff'
        const r = parseInt(data.slice(0, 2), 16)
        const g = parseInt(data.slice(2, 4), 16)
        const b = parseInt(data.slice(4, 6), 16)
        const a = 0.75 + parseInt(data.slice(6, 8), 16) / 512
        return `rgba(${r},${g},${b},${a})`
    }

    // Split hex data into groups of 4 bytes to create rgba colors
    const getColors = (hexData) => {
        const colors = hexData.slice(2).match(/.{1,8}/g) || [];
        return colors.map( hex => [hex,getRGBAString(hex)])
    }

    // Creates a path from an array with all the control points defined
    const getPath = (arr) => {

        // First coordinates are the path start point
        let path = `M${arr[0]} ${arr[1]}`

        // Every 3 coordinates, we create a Cubic Bézier Curve
        for (let i = 2; i < arr.length - 2; i += 6) {
            path += `C${arr[i]} ${arr[i + 1]} ${arr[i + 2]} ${arr[i + 3]} ${arr[i + 4]} ${arr[i + 5]}`
        }

        // We have 1 last coordinate that we use as control point for a Quadratic Bézier Curve
        path += `Q${arr[arr.length - 2]} ${arr[arr.length - 1]} ${arr[0]} ${arr[1]}z`

        return path
    }

    const softenCurves = (coordArray) => {
        // From an array of 40 numbers (20 coordinates),
        // generate an array of 58 numbers to soften Cubic Beziér Curves

        // First 4 coordinates, are the same
        const arr = coordArray.slice(0, 4)

        // Every 4 coordinates we add 1 so the curves don't have hard edges
        for (let i = 4; i < coordArray.length; i += 4) {
            arr.splice(arr.length, 0, ...coordArray.slice(i, i + 4))
            arr.push(2 * coordArray[i + 2] - coordArray[i], 2 * coordArray[i + 3] - coordArray[i + 1])
        }
        // The last added coordinates can be used for a Quadratic bezier curve at the end

        return arr
    }

    const getPaths = (ethAddress) => {
        const numArray = ethAddress.substring(2).split('').map(
            // We 'shift' coordinates by 8 to center them inside
            // a 32x32 grid with 'hex' values
            char => parseInt(char, 16) + 8
        )

        const arr = softenCurves(numArray)

        // We create a (vertical) symmetric set of coordinates
        // to give the SVG an easier way to be remembered
        let symArr = arr.map((val, index) => (index % 2) ? val : 32 - val)

        return [getPath(arr), getPath(symArr)]

    }

    const paths = getPaths(address)
    const hash = keccak256(address)
    const colors = getColors(hash)
    // console.log(colors)

    return ((!paths || !colors ) ?
        <p>Loading SVGies...</p> :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={width} height={height}>

            <radialGradient id={`${colors[0][0]}${colors[1][0]}`}>
                <stop offset="0" stopColor={colors[0][1]} />
                <stop offset="1" stopColor={colors[1][1]} />
                {/* <stop offset="1" stopColor="transparent" /> */}
            </radialGradient>
            <rect width="100%" height="100%" opacity="1" fill="white"/>
            <rect width="100%" height="100%" opacity=".5" fill={`url(#${colors[0][0]}${colors[1][0]})`}/>
            {/* <circle cy={16} cx={16} r={16} opacity=".5" fill={`url(#${colors[0][0]}${colors[1][0]})`}/> */}

            <linearGradient id={`${colors[2][0]}${colors[3][0]}${colors[2][0]}`}>
                <stop offset="0" stopColor={colors[2][1]} />
                <stop offset=".5" stopColor={colors[3][1]} />
                <stop offset="1" stopColor={colors[2][1]} />
            </linearGradient>
            <linearGradient id={`${colors[3][0]}${colors[2][0]}${colors[3][0]}`}>
                <stop offset="0" stopColor={colors[3][1]} />
                <stop offset=".5" stopColor={colors[2][1]} />
                <stop offset="1" stopColor={colors[3][1]} />
            </linearGradient>
            <path
                fill={`url(#${colors[2][0]}${colors[3][0]}${colors[2][0]})`}
                strokeWidth={.1}
                stroke={`url(#${colors[3][0]}${colors[2][0]}${colors[3][0]})`}
                d={`${paths[0]}${paths[1]}`}
            />

            <linearGradient id={`${colors[4][0]}${colors[3][0]}${colors[2][0]}`}>
                <stop offset="0" stopColor={colors[4][1]} />
                <stop offset=".5" stopColor={colors[3][1]} />
                <stop offset="1" stopColor={colors[2][1]} />
            </linearGradient>
            {/* <path fill={`url(#${colors[4][0]}${colors[3][0]}${colors[2][0]})`} d={paths[1]} /> */}
        </svg>
    )

}

export default SVGies