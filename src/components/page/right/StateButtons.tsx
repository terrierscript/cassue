import { Box, Button, HStack } from "@chakra-ui/react"
import { IssueReopenedIcon } from "@primer/octicons-react"
import { FC, useState } from "react"
import { IssueResponse } from "../../../services/github/GithubClient"
import { fetchPost } from "../../../services/swr/fetcher"
import { IssueStateIcon } from "../../chat/message/IssueStateIcon"
import { useIssueComments, useIssuesInfinate } from "../apiHooks"
import { useRouterValues } from "../useChatRouteParam"
import { useIssueUpdate } from "./useIssueUpdate"

const useStateUpdateHandler = (issueNumber: number) => {
  const [sending, setSending] = useState(false)
  const update = useIssueUpdate(issueNumber)
  const changeHandler = async (state: "closed" | "open", /*state_reason*/) => {
    setSending(true)
    await update({
      state: state
    })
    setSending(false)
  }
  return {
    changeHandler,
    sending
  }
}

const CloseButton: FC<{ onChange: Function }> = ({ onChange }) => {
  const { number } = useRouterValues()
  if (number === null) {
    return <Box />
  }

  const { sending, changeHandler } = useStateUpdateHandler(number)
  return <HStack>
    <Button
      isDisabled={sending}
      onClick={async () => {
        await changeHandler("closed")
        onChange()
      }} variant={"outline"} colorScheme="purple" leftIcon={<IssueStateIcon issue={{ state: "close", state_reason: "completed" }} />}>Close</Button>
  </HStack>
}

const OpenButton: FC<{ onChange: Function }> = ({ onChange }) => {
  const { sending, changeHandler } = useStateUpdateHandler()
  return <HStack>
    <Button
      isDisabled={sending}
      onClick={async () => {
        changeHandler("open")
        onChange()
      }} variant={"outline"} colorScheme="green" leftIcon={<IssueReopenedIcon />}>Reopen</Button>
  </HStack>
}

export const StateButtons: FC<{ issue: IssueResponse }> = ({ issue }) => {
  const { owner, repo, target, value } = useRouterValues()
  const { mutate: mutateComment } = useIssueComments({ owner, repo, number: issue.number })
  const { mutate: mutateIssue } = useIssuesInfinate({ owner, repo, target, value })
  const change = () => {
    mutateComment()
    mutateIssue()
  }

  return <HStack>
    {issue.state === "open"
      ? <CloseButton onChange={change} />
      : <OpenButton onChange={change} />}
  </HStack>
}
