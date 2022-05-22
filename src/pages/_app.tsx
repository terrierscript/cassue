import { SessionProvider } from "next-auth/react"
import { Box, ChakraProvider } from "@chakra-ui/react"
import React, { } from "react"
import { appTheme } from "../services/chakra/theme"
import { AppProps } from "next/app"
import { NeedLayout } from "../components/layout/NeedLayout"
import Head from "next/head"
import { AppSWRPRovider } from "../services/swr/AppSWRProvider"

function MyApp({ Component, pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>chat issue</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <ChakraProvider theme={appTheme}>
        <Box bg="red.100">

          <AppSWRPRovider>
            <Box bg="blue.100">
              <SessionProvider session={session}>
                <Box bg="green.100">
                  <NeedLayout>
                    <Box bg="yellow.100">
                      <Component {...pageProps} />
                    </Box>
                  </NeedLayout>
                </Box>
              </SessionProvider>
            </Box>
          </AppSWRPRovider>
        </Box>
      </ChakraProvider >
    </>
  )
}

export default MyApp
