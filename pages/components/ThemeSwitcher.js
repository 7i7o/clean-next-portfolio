import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { IconButton, useColorMode } from "@chakra-ui/react"

const ThemeSwitcher = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <IconButton
            mx='.5em'
            rounded='full'
            aria-label='Toggle dark mode'
            bgColor='transparent'
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            _hover={{
                bgColor: 'transparent',
            }}
        />
    )
}

export default ThemeSwitcher