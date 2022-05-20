import { SessionProvider } from "next-auth/react"
import { ChakraProvider, ColorModeScript, Container, useColorMode } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { appTheme } from "../services/chakra/theme"
import { AppProps } from "next/app"

// const Theme = () => {
//   const { colorMode, toggleColorMode, setColorMode } = useColorMode()
//   useEffect(() => {
//     setColorMode("light")
//   }, [])
//   return null
// }

function MyApp({ Component, pageProps: { session, ...pageProps },
}: AppProps) {
  return <ChakraProvider theme={appTheme}>
    {/* <Theme /> */}
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </ChakraProvider>
}

export default MyApp
