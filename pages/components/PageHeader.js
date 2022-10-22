import { Center, Heading, useColorModeValue, VStack } from "@chakra-ui/react"


const PageHeader = (props) => {

    const variant = useColorModeValue('gradientBgLight', 'gradientBgDark')

    return (
        <>
            <Center w='100%' h={20} >
                <Heading
                    fontSize={['3xl', '5xl', '7xl']}
                    variant={variant}
                >
                    SVGies
                </Heading>
            </Center>

            <Center>
                <VStack >
                    <Center px='3em' pt='1em'>
                        <p align='center' >
                            SVGies are a unique visual representation of your wallet address <br />
                            You can only mint ONE because they are a 1:1 representation of your wallet <br />
                            {/* They are stored on-chain in the Polygon mainnet network <br /> */}
                            They are stored on-chain in Ethereum mainnet network <br />
                            You can think of them as Blockies that evolved to SVGs (Scalable Vector Graphics never get pixelated) <br />
                            Drawn as generative art in a beautifully detailed and colorful SVG <br />
                            Using Quadratic and Cubic Bézier curves and leveraging our brain&apos;s ability to remember vertical simmetry <br />
                            It is tied to your wallet and cannot be transferred
                        </p>
                    </Center>
                </VStack>
            </Center>

        </>
    )
}

export default PageHeader