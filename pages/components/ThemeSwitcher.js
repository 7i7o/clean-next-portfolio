import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Flex, IconButton, Spacer, useColorMode } from "@chakra-ui/react"
import { useEffect } from "react"

const ThemeSwitcher = (props) => {

    const { setWalletTheme } = props
    const { colorMode, toggleColorMode } = useColorMode()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { setWalletTheme(colorMode) }, [colorMode])

    return (
        <Flex>
            <Spacer />
            <IconButton
                rounded='full'
                aria-label='Toggle dark mode'
                bgColor='transparent'
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                _hover={{
                    bgColor: 'transparent',
                }}
            />
        </Flex>
    )
}

export default ThemeSwitcher