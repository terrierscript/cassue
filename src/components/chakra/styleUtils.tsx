import { useColorModeValue } from "@chakra-ui/react"

/** @deprecated */
export const alphaBgStyle = (level = 50) => {
  return {
    _light: { bg: `blackAlpha.${level}` },
    _dark: { bg: `whiteAlpha.${level}` }
  }
}

/** @deprecated */
export const useAlpha = (level: number) => {
  return useColorModeValue(`whiteAlpha.${level}`, `blackAlpha.${level}`)
}
/** @deprecated */
export const useInverseAlpha = (level: number) => {
  return useColorModeValue(`blackAlpha.${level}`, `whiteAlpha.${level}`,)
}