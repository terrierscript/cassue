import { extendTheme, ThemeConfig, withDefaultColorScheme } from "@chakra-ui/react"
export const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  'black2': {
    '50': '#f2f2f2',
    '100': '#e6e6e6',
    '200': '#bfbfbf',
    '300': '#999999',
    '400': '#4d4d4d',
    "500": "#18181B",
    "600": "#18181B",
    "700": "#18181B",
    '800': '#000000',
    '900': '#000000'
  },
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
  "green": {
    "50": "#EFF5EF",
    "100": "#D3E3D3",
    "200": "#B7D1B7",
    "300": "#9BC09B",
    "400": "#7FAE7F",
    "500": "#639C63",
    "600": "#4F7D4F",
    "700": "#3B5E3B",
    "800": "#283E28",
    "900": "#141F14"
  },
  "red": {
    "50": "#FCE9EE",
    "100": "#F6C0CF",
    "200": "#F098B0",
    "300": "#EB7091",
    "400": "#E54872",
    "500": "#DF2053",
    "600": "#B31942",
    "700": "#861332",
    "800": "#590D21",
    "900": "#2D0611"
  }

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
  withDefaultColorScheme({ colorScheme: 'black2' }),
)

// console.log(appTheme)