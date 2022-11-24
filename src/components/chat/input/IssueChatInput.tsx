import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { useIssuesInfinate } from "../../page/apiHooks"
import { resolveFilterToPost } from "../../../services/github/resolveFilter"
import { useChatRouteParam, useFilterValue } from "../../page/useChatRouteParam"
import { alphaBgStyle } from "../../chakra/styleUtils"
import { ReadOnlyGuard } from "./ReadOnly"
import { IssuePost } from "../../../services/github/Schema"
import { ChatInput } from "./ChatInput"
import { CommentIcon } from "@primer/octicons-react"
import { useAppClient } from "../../../utils/trpc"
import { chatInputAtom } from "../../../services/state/chatInputAtom"
import { useSetRecoilState } from "recoil"

const InputSending: FC<{}> = ({ }) => {
  const { owner, repo, filter } = useChatRouteParam()
  const { target, value } = useFilterValue()
  const trpc = useAppClient()
  const setChatInputSending = useSetRecoilState(chatInputAtom)
  const { mutate } = useIssuesInfinate({ owner, repo, target, value })
  return <ChatInput
    icon={<CommentIcon />}
    onSubmit={async (v) => {
      const resolvedParams = resolveFilterToPost(filter)
      const issue: IssuePost = { title: v, ...resolvedParams }
      setChatInputSending(true)
      const result = await trpc.postMessage.mutate({
        query: { owner, repo },
        issue
      })
      await mutate()
      setChatInputSending(false)
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