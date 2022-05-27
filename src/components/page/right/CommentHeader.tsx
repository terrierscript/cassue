import { Box } from "@chakra-ui/react"
import { useCommentNumber } from "../useChatRouteParam"

export const CommentHeader = () => {
  const number = useCommentNumber()
  
  return <Box p={4}>
    <Box>#{number}</Box>
  </Box>
}
