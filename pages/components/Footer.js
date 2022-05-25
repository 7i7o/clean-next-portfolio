import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Center, Link } from "@chakra-ui/react"

const Footer = () => {
    return (
        <Center h='7em' >
            2022 MIT License &copy;&nbsp;
            <Link
                isExternal
                href="http://www.twitter.com/7i7o"
            >
                7i7o
                <ExternalLinkIcon mx={1} />
            </Link>
        </Center>
    )
}

export default Footer