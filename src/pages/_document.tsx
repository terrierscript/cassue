import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { themeConfig } from '../services/chakra/theme'


export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel="manifest" href="manifest.webmanifest" />
        </Head>
        <body >
          {/* <ColorModeScript type="localStorage" initialColorMode={"dark"} /> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
