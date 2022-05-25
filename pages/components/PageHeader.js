import { Center, Heading, useColorModeValue, VStack } from "@chakra-ui/react"


const PageHeader = (props) => {

    const variant = useColorModeValue('gradientBgLight', 'gradientBgDark')

    return (
        <>
            <Center w='100%' h={32} >
                <Heading
                    size='lg'
                    variant={variant}
                >
                    SVGies
                </Heading>
            </Center>

            <Center>
                <VStack >
                    <Center pl='3em' pr='3em' align={'center'}>SVGies are a unique visual representation of your wallet address</Center>
                    <Center pl='3em' pr='3em' align={'center'}>You can only mint ONE because they are a 1:1 representation of your wallet</Center>
                    <Center pl='3em' pr='3em' align={'center'}>They are stored on-chain in the Polygon mainnet network</Center>
                    <Center pl='3em' pr='3em' align={'center'}>You can think of them as Blockies that evolved to SVGs (Scalable Vector Graphics never get pixelated)</Center>
                    <Center pl='3em' pr='3em' align={'center'}>Drawn as generative art in a beautifully detailed and colorful SVG</Center>
                    <Center pl='3em' pr='3em' align={'center'}>Using Quadratic and Cubic Bézier curves and leveraging our brain&apos;s ability to remember vertical simmetry</Center>
                    <Center pl='3em' pr='3em' align={'center'}>It is tied to your wallet and cannot be transfered</Center>
                </VStack>
            </Center>

        </>
    )
}

export default PageHeader