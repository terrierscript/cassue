import { SessionProvider } from "next-auth/react"
import { Box, ChakraProvider, ColorModeScript, Container, Flex, useColorMode } from "@chakra-ui/react"
import React, { Suspense, useEffect } from "react"
import { appTheme } from "../services/chakra/theme"
import { AppProps } from "next/app"
import Div100vh from "react-div-100vh"

const Theme = () => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode()
  useEffect(() => {
    setColorMode("light")
  }, [])
  return null
}

function MyApp({ Component, pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ChakraProvider theme={appTheme}>
      <Flex overflow={"hidden"} >
        <Theme />
        {/* <Suspense fallback={<Box>...</Box>}> */}
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
        {/* </Suspense> */}
      </Flex>
    </ChakraProvider >
  )
}

export default MyApp
