import { extendTheme, ThemeConfig, withDefaultColorScheme } from "@chakra-ui/react"
export const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// const r = withDefaultColorScheme({ colorScheme: "gray" })
// console.log(r())
export const appTheme = extendTheme({
  config: themeConfig,
  shadows: {
    outline: "0 0 0 3px rgba(0,0,0.0.05)"
  },

},
  // withDefaultColorScheme({ colorScheme: 'blackAlpha' }),
)

console.log(appTheme)