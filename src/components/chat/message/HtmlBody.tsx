import { Box } from "@chakra-ui/react"
import { FC } from "react"



export const HtmlBody: FC<{ html: string }> = ({ html }) => {
  return <Box
    sx={{
      ul: {
        px: 4,
      }
    }}
    dangerouslySetInnerHTML={{ __html: html }} />

}
