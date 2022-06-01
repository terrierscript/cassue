import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { IssueResponse } from "../../../services/github/GithubClient"
import { IssueClosedIcon, IssueOpenedIcon, SkipIcon } from "@primer/octicons-react"

type IssueState = {
  state: string,
  state_reason?: string
} | IssueResponse

export const useIssueIconColor = (issue: IssueState) => {
  switch (issue.state) {
    case "open":
      return "green"
  }

  // @ts-ignore state_reason is not 
  switch (issue.state_reason) {
    case "not_planned":
      return "gray"
    default:
      return "purple"
  }
}
// type Postable2 = IssueComementResponse & IssueResponse


export const IssueStateIcon: FC<{ issue: IssueState }> = ({ issue }) => {
  switch (issue.state) {
    case "open":
      return <IssueOpenedIcon />
  }
  // @ts-ignore state_reason is not 
  switch (issue.state_reason) {
    case "not_planned":
      return <SkipIcon />
    default:
      return <IssueClosedIcon />
  }
}
