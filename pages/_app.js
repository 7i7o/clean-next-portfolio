import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'
import WalletConnector from './components/WalletConnector';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <WalletConnector Component={Component} pageProps={pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
