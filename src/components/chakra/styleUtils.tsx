
/** @deprecated */
export const alphaBgStyle = (level = 50) => {
  return {
    _light: { bg: `blackAlpha.${level}` },
    _dark: { bg: `blackAlpha.${level}` }
  }
}

/** @deprecated */
export const useAlpha = (level: number) => {
  return `whiteAlpha.${level}`
}

/** @deprecated */
export const useInverseAlpha = (level: number) => {
  return `blackAlpha.${level}`
}