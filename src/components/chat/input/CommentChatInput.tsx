import { Box, HStack, IconButton, Input } from "@chakra-ui/react"
import { FC, useState } from "react"
import { CommentPost, IssuePost } from "../../../services/github/Schema"
import { useIssueComments, useIssues } from "../../page/apiHooks"
import { resolveFilterToPost } from "../../../services/github/resolveFilter"
import { useChatRouteParam, useCommentNumber, useFilterValue } from "../../page/useChatRouteParam"
import { alphaBgStyle } from "../../atomic/styleUtils"
import { CommentDiscussionIcon } from '@primer/octicons-react'
import { ReadOnlyGuard } from "./ReadOnly"

const ChatInput: FC<{ onSubmit: (value: string) => void }> = ({ onSubmit }) => {
  const [value, setValue] = useState("")
  return <form onSubmit={(e) => {
    e.preventDefault()
    onSubmit(value)
    setValue("")
  }}>
    <HStack>
      <Input
        _light={{
          bg: "whiteAlpha.800"
        }}
        _dark={{
          bg: "blackAlpha.800"
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton
        type="submit"
        icon={<CommentDiscussionIcon />}
        aria-label={"Post"}
      />
    </HStack>
  </form>
}


const InputSending: FC<{ number: number }> = ({ number }) => {
  const { owner, repo, filter } = useChatRouteParam()
  const { target, value } = useFilterValue()
  const { mutate } = useIssues({ owner, repo, target, value })
  const { mutate: mutateComment } = useIssueComments({ owner, repo, number })
  return <ChatInput onSubmit={async (v) => {
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