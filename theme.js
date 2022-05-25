import { extendTheme } from '@chakra-ui/react'

const Card = {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    bg: 'white',
  },
  sizes: {
    xl: {
      boxSize: 360,
      borderRadius: 16,
    },
    md: {
      boxSize: 240,
      borderRadius: 11,
    },
    sm: {
      boxSize: 190,
      borderRadius: 8,
    },
  },
  variants: {
    shadowLight: {
      bg: '#00000044',
      _hover: {
        boxShadow: '0 0 8px #7928CA',
        bg: '#00000022',
      },
    },
    shadowDark: {
      bg: '#ffffffcc',
      _hover: {
        boxShadow: '0 0 8px #ff0080',
        bg: '#ffffffee',
      },
    },
  },
  defaultProps: {
    size: 'xl',
    variant: 'shadowDark',
  },
}

const colors = {
  svgieLight: {
    placeholder: "#000000ff",
    boxBg: "#00000044",
    boxBgHover: "#00000022",
    accent: "#7928CA",
    accent2: "#FF0080",
  },
  svgieDark: {
    placeholder: "#ffffffff",
    boxBg: "#ffffffcc",
    boxBgHover: "#ffffffee",
    accent: "#FF0080",
    accent2: "#7928CA",
  },
}
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  colors,
  components: {
    Card,
  },
  styles: {
    global: {
      span: {
        svg: {
          w: 300,
          h: 300,
        },
      },
    },
  },
})
