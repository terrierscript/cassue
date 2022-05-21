import { extendTheme, ThemeConfig } from "@chakra-ui/react"
export const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const appTheme = extendTheme({
  config: themeConfig
})

