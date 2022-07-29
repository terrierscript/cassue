import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { IssueNumberResponse } from "../../../services/github/GithubClient"
import { useInverseAlpha } from "../../chakra/styleUtils"
import { HtmlBody } from "../../chat/message/HtmlBody"

export const IssueBodyText: FC<{ issue: IssueNumberResponse }> = ({ issue }) => {
  const color = useInverseAlpha(500)
  if (issue.body_html) {
    return <HtmlBody html={issue.body_html} />
  }
  if (issue.body) {
    return <Box>{issue.body}</Box>
  }
  return <Box color={color}
    fontStyle="italic">No description provided.</Box>
}
