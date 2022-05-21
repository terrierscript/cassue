import { Box, Divider } from "@chakra-ui/react"
import { FC } from "react"
import { IssueParam } from "../../../services/github/Schema"

export const ChatHeader: FC<IssueParam> = ({ owner, repo }) => {
  return <Box>
    <Box p={4} fontWeight="bold">
      # {owner}/{repo}
    </Box>
    <Divider />
  </Box>
}
