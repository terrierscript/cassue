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
        <title>Cassue</title>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <ChakraProvider theme={appTheme}>
        <AppSWRPRovider>

          {/* <IconContext.Provider value={{ color: "white" }}> */}
          {/* <Suspense fallback={<Box>...</Box>}> */}
          <SessionProvider session={session}>
            <NeedLayout>
              <Component {...pageProps} />
            </NeedLayout>
          </SessionProvider>
          {/* </Suspense> */}
          {/* </IconContext.Provider> */}
        </AppSWRPRovider>
      </ChakraProvider >
    </>
  )
}

export default MyApp
