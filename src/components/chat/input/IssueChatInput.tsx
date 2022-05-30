import { Box, HStack, IconButton, Input } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useIssues } from "../../page/apiHooks"
import { resolveFilterToPost } from "../../../services/github/resolveFilter"
import { useChatRouteParam, useFilterValue } from "../../page/useChatRouteParam"
import { alphaBgStyle } from "../../atomic/styleUtils"
import { CommentIcon } from '@primer/octicons-react'
import { ReadOnlyGuard } from "./ReadOnly"
import { IssuePost } from "../../../services/github/Schema"
import { useForm } from "react-hook-form"

const ChatInput: FC<{ onSubmit: (value: string) => void }> = ({ onSubmit }) => {
  // const [value, setValue] = useState("")
  const { register, handleSubmit, formState, reset } = useForm()
  return <form onSubmit={handleSubmit(async (data) => {
    await onSubmit(data.value)
    reset()
  })}>
    <HStack>
      <Input
        disabled={formState.isSubmitting}
        _light={{
          bg: "whiteAlpha.800"
        }}
        _dark={{
          bg: "blackAlpha.800"
        }}
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        {...register("value")}
      />
      <IconButton
        type="submit"
        icon={<CommentIcon />}
        aria-label={"Post"}
      />
    </HStack>
  </form>
}


const InputSending: FC<{}> = ({ }) => {
  const { owner, repo, filter } = useChatRouteParam()
  const { target, value } = useFilterValue()

  const { mutate } = useIssues({ owner, repo, target, value })
  return <ChatInput onSubmit={async (v) => {
    const resolvedParams = resolveFilterToPost(filter)
    const issue: IssuePost = { title: v, ...resolvedParams }
    const result = await fetch(`/api/issues/${owner}/${repo}`, {
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