import { useColorModeValue } from "@chakra-ui/react"

export const alphaBgStyle = (level = 50) => {
  return {
    _light: { bg: `blackAlpha.${level}` },
    _dark: { bg: `whiteAlpha.${level}` }
  }
}


export const useAlpha = (level: number) => {
  return useColorModeValue(`whiteAlpha.${level}`, `blackAlpha.${level}`)
}
export const useInverseAlpha = (level: number) => {
  return useColorModeValue(`blackAlpha.${level}`, `whiteAlpha.${level}`,)
}