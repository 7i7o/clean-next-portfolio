import { extendTheme } from '@chakra-ui/react'

const colors = {
  svgieLight: {
    placeholder: "#000000ff",
    boxBg: "#00000033",
    boxBgHover: "#00000011",
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
      bg: colors.svgieLight.boxBg,
      _hover: {
        boxShadow: `0 0 8px ${colors.svgieLight.accent}`,
        bg: colors.svgieLight.boxBgHover,
      },
    },
    shadowDark: {
      bg: colors.svgieDark.boxBg,
      _hover: {
        boxShadow: `0 0 8px ${colors.svgieDark.accent}`,
        bg: colors.svgieDark.boxBgHover,
      },
    },
  },
  defaultProps: {
    size: 'xl',
    variant: 'shadowDark',
  },
}

const Heading = {
  baseStyle: {
    fontWeight: 'extrabold'
  },
  sizes: {
    lg: {
      fontSize: '7xl',
    },
    md: {
      fontSize: '5xl',
    },
    sm: {
      fontSize: '3xl',
    },
  },
  variants: {
    gradientBgLight: {
      bgClip: 'text',
      bgGradient: `linear(to-b, ${colors.svgieLight.accent2}, ${colors.svgieLight.accent})`,
    },
    gradientBgDark: {
      bgClip: 'text',
      bgGradient: `linear(to-b, ${colors.svgieDark.accent2}, ${colors.svgieDark.accent})`,
    },
    withShadowLight: {
      color: 'black.900',
      textShadow: `0 0 10px ${colors.svgieLight.accent}`,
    },
    withShadowDark: {
      color: 'white.900',
      textShadow: `0 0 10px ${colors.svgieDark.accent}`,
    },
  },
  defaultProps: {
    size: '',
    variant: '',
  },
}

const Link = {
  baseStyle: {
    color: 'teal.500',
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles = {
  global: {
    span: {
      svg: {
        w: 300,
        h: 300,
      },
    },
  },
}

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
}

export const theme = extendTheme({
  config,
  colors,
  components: {
    Heading,
    Link,
    Card,
  },
  breakpoints,
  styles,
})
