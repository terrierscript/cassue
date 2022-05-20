import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { themeConfig } from '../services/chakra/theme'


export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel="manifest" href="manifest.webmanifest" />
          <style >{`
            html,body {
              touch-action:none;
              height: 100%;
              width: 100%;
              overscroll-behavior-y: none;

              position: fixed;
              overflow: hidden;
            }
            `}
          </style>
        </Head>
        <body >
          <ColorModeScript type="localStorage" initialColorMode={"light"} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
