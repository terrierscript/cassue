import { Box } from "@chakra-ui/react"
import { FC, useEffect, useRef } from "react"



export const HtmlBody: FC<{ html: string }> = ({ html }) => {
  const ref = useRef<HTMLDivElement>(null)

  const parseChild = (nodes: NodeListOf<ChildNode>) => {
    for (const node of nodes) {

      if (node.nodeName === "A") {
        // @ts-ignore
        node.setAttribute && node.setAttribute("target", "_blank")
      }
      parseChild(node.childNodes)
    }
  }
  const traverse = (ref: HTMLDivElement) => {
    parseChild(ref.childNodes)
  }
  return <Box sx={{ ul: { px: 4 } }}>
    <div
      ref={(ref) => {
        ref && traverse(ref)
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </Box>

}
