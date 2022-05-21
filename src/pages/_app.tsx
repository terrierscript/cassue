import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import React, { } from "react"
import { appTheme } from "../services/chakra/theme"
import { AppProps } from "next/app"
import { NeedLayout } from "../components/layout/NeedLayout"
import Head from "next/head"

function MyApp({ Component, pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>chat issue</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <ChakraProvider theme={appTheme}>
        {/* <Suspense fallback={<Box>...</Box>}> */}
        <SessionProvider session={session}>
          <NeedLayout>

            <Component {...pageProps} />
          </NeedLayout>
        </SessionProvider>
        {/* </Suspense> */}
      </ChakraProvider >
    </>
  )
}

export default MyApp
