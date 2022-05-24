import { extendTheme, ThemeConfig, withDefaultColorScheme } from "@chakra-ui/react"
export const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  gh: {
    "50": "#F2F2F3",
    "100": "#D9D9DD",
    "200": "#18181B",
    "300": "#18181B",
    "400": "#18181B",
    "500": "#18181B",
    "600": "#18181B",
    "700": "#18181B",
    "800": "#18181B",
    "900": "#18181B"
  },
  'victoria': {
    '50': '#BBA7D2',
    '100': '#B09ACB',
    '200': '#9B7FBD',
    '300': '#8664AF',
    '400': '#72509B',
    '500': '#5E4280',
    '600': '#4F376C',
    '700': '#402D58',
    '800': '#322343',
    '900': '#23182F'
  },
}



// const r = withDefaultColorScheme({ colorScheme: "gray" })
// console.log(r())
export const appTheme = extendTheme({
  config: themeConfig,
  colors: colors,
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'gray.500',
      },
    },
  },
  shadows: {
    outline: "0 0 0 3px rgba(0,0,0.0.05)"
  },
  breakpoints: {
    bp: "42em"
  }

},
  withDefaultColorScheme({ colorScheme: 'teal' }),
)

// console.log(appTheme)