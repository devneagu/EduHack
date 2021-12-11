import '../styles/globals.css'
import {RecoilRoot} from "recoil";
import {ChakraProvider} from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return(
    <RecoilRoot>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
