import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import React, { } from "react"
import { appTheme } from "../services/chakra/theme"
import { AppProps } from "next/app"
import Head from "next/head"
import { AppSWRPRovider } from "../services/swr/AppSWRProvider"
import { SafeArea } from "../components/layout/SafeArea"
import { RecoilRoot } from "recoil"

function MyApp({ Component, pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Cassue</title>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>

        <meta name="apple-mobile-web-app-status-bar-style" content="black" ></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

      </Head>
      <RecoilRoot>
        <ChakraProvider theme={appTheme}>
          <AppSWRPRovider>
            <SessionProvider session={session}>
              <SafeArea>
                <Component {...pageProps} />
              </SafeArea>
            </SessionProvider>
          </AppSWRPRovider>
        </ChakraProvider >
      </RecoilRoot>
    </>
  )
}

export default MyApp
