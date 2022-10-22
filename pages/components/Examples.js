import { Center, Heading, useColorModeValue, Wrap, WrapItem } from "@chakra-ui/react"
import Card from "./Card"
import SVGies from "./SVGies"
import { wallets } from "../../constants/wallets"


const Examples = () => {

    const headingVariant = useColorModeValue('withShadowLight', 'withShadowDark')
    const cardVariant = useColorModeValue('shadowLight', 'shadowDark')

    return (
        <>
            <Center h='7em'>
                <Heading
                    size='sm'
                    variant={headingVariant}
                >
                    SVGies Examples
                </Heading>
            </Center>

            <Center pb='3em'>
                <Wrap spacing="30px" pt='10px' pb='10px' justify='center' >
                    {wallets.map((w, i) => {
                        return (
                            <WrapItem key={i}>
                                <Card
                                    size='sm'
                                    variant={cardVariant}
                                >
                                    <SVGies className='SVGiejs' address={w} width={150} height={150} />
                                </Card>
                            </WrapItem>
                        )
                    })}
                </Wrap>
            </Center>
        </>
    )

}

export default Examples