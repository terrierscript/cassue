export const alphaBgStyle = (level = 50) => {
  return {
    _light: { bg: `blackAlpha.${level}` },
    _dark: { bg: `whiteAlpha.${level}` }
  }
}
