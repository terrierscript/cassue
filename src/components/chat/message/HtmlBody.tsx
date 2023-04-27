import { Box } from "@chakra-ui/react"
import { FC, useEffect, useRef } from "react"



export const HtmlBody: FC<{ html: string }> = ({ html }) => {
  const ref = useRef<HTMLDivElement>(null)
  const traverse = () => {
  }
  return <Box
    sx={{
      ul: {
        px: 4,
      }
    }}
  >
    <div
      ref={(ref) => {
        console.log(ref?.childNodes)
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </Box>

}
