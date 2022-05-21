import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { themeConfig } from '../services/chakra/theme'


const css = (str: TemplateStringsArray) => str

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <style >{css`
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
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
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
