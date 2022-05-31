import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { CommentPost } from "../../../services/github/Schema"
import { useIssueComments, useIssues } from "../../page/apiHooks"
import { useChatRouteParam, useCommentNumber, useFilterValue } from "../../page/useChatRouteParam"
import { alphaBgStyle } from "../../atomic/styleUtils"
import { CommentDiscussionIcon } from '@primer/octicons-react'
import { ReadOnlyGuard } from "./ReadOnly"
import { ChatInput } from "./ChatInput"

// const ChatInput: FC<{ o
const InputSending: FC<{ number: number }> = ({ number }) => {
  const { owner, repo, filter } = useChatRouteParam()
  const { target, value } = useFilterValue()
  const { mutate } = useIssues({ owner, repo, target, value })
  const { mutate: mutateComment } = useIssueComments({ owner, repo, number })
  return <ChatInput
    icon={<CommentDiscussionIcon />}
    onSubmit={async (v) => {
      // const resolvedParams = resolveFilterToPost(filter)
      const issue: CommentPost = { body: v }
      const result = await fetch(`/api/comments/${owner}/${repo}/${number}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(issue)
      })
      mutate()
      mutateComment()
      return result
    }} />
}


export const CommentChatInputArea: FC<{}> = ({ }) => {
  const number = useCommentNumber()
  if (!number) {
    return null
  }
  return <Box p={2} {...alphaBgStyle(50)}>
    <ReadOnlyGuard >
      <InputSending number={number} />
    </ReadOnlyGuard>
  </Box>
}


export default CommentChatInputArea