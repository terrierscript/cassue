import { Box, Button, HStack } from "@chakra-ui/react"
import { IssueReopenedIcon } from "@primer/octicons-react"
import { FC } from "react"
import { IssueResponse } from "../../../services/github/GithubClient"
import { fetchPost } from "../../../services/swr/fetcher"
import { IssueStateIcon } from "../../chat/message/IssueStateIcon"
import { useIssueComments, useIssuesInfinate } from "../apiHooks"
import { useRouterValues } from "../useChatRouteParam"

const useStateUpdateHandler = () => {
  const { owner, repo, number } = useRouterValues()
  return async (state: "closed" | "open", /*state_reason*/) => {
    await fetchPost(`/api/issues/${owner}/${repo}/${number}/state`, {
      state: state
    })
  }
}

const CloseButton: FC<{ onChange: Function }> = ({ onChange }) => {
  const change = useStateUpdateHandler()
  return <HStack>
    <Button onClick={async () => {
      change("closed")
      onChange()
    }} variant={"outline"} colorScheme="purple" leftIcon={<IssueStateIcon issue={{ state: "close", state_reason: "completed" }} />}>Close</Button>
  </HStack>
}

const OpenButton: FC<{ onChange: Function }> = ({ onChange }) => {
  const change = useStateUpdateHandler()
  return <HStack>
    <Button onClick={async () => {
      change("open")
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
