import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { useIssues } from "../../page/apiHooks"
import { resolveFilterToPost } from "../../../services/github/resolveFilter"
import { useChatRouteParam, useFilterValue } from "../../page/useChatRouteParam"
import { alphaBgStyle } from "../../atomic/styleUtils"
import { ReadOnlyGuard } from "./ReadOnly"
import { IssuePost } from "../../../services/github/Schema"
import { ChatInput } from "./ChatInput"
import { CommentIcon } from "@primer/octicons-react"

const InputSending: FC<{}> = ({ }) => {
  const { owner, repo, filter } = useChatRouteParam()
  const { target, value } = useFilterValue()

  const { mutate } = useIssues({ owner, repo, target, value })
  return <ChatInput
    icon={<CommentIcon />}
    onSubmit={async (v) => {
      const resolvedParams = resolveFilterToPost(filter)
      const issue: IssuePost = { title: v, ...resolvedParams }
      const result = await fetch(`/api/messages/${owner}/${repo}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(issue)
      })
      mutate()
      return result
    }} />
}


export const IssueChatInputArea: FC<{}> = ({ }) => {
  return <Box p={2} {...alphaBgStyle(50)}>
    <ReadOnlyGuard >
      <InputSending />
    </ReadOnlyGuard>
  </Box>
}


export default IssueChatInputArea