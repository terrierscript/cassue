import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import React from "react"

function MyApp({ Component, pageProps: { session, ...pageProps },
}) {
  return <ChakraProvider>
    <SessionProvider session={session}>

      <Component {...pageProps} />
    </SessionProvider>
  </ChakraProvider>
}

export default MyApp
