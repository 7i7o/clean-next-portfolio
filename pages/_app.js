import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import ContextProvider from './Context';


const MyApp = ({ Component, pageProps }) => {

  return (
    <ChakraProvider theme={theme} >
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </ChakraProvider >
  )
}

export default MyApp
