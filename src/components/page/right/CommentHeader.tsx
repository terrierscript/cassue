import { Box, Heading, HStack, Link, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { IssueNumberResponse } from "../../../services/github/GithubClient"
import { useAlpha, useInverseAlpha } from "../../atomic/styleUtils"
import { HtmlBody } from "../../chat/message/HtmlBody"
import { useIssueComments } from "../apiHooks"
import { useChatRouteParam, useCommentNumber } from "../useChatRouteParam"

const IssueBody: FC<{ issue: IssueNumberResponse }> = ({ issue }) => {
  const bg = useInverseAlpha(50)
  if (issue.body_html) {
    return <Box bg={bg}>
      <HtmlBody html={issue.body_html} />
    </Box>
  }
  if (issue.body) {
    return <Box bg={bg}>
      <Box>{issue.body}</Box>
    </Box>
  }
  return null
}
export const CommentHeader: FC<{ issueNumber: number }> = ({ issueNumber }) => {
  const { owner, repo } = useChatRouteParam()
  const { data } = useIssueComments({ owner, repo, number: issueNumber })
  const issue = data?.issue
  if (!issue) {
    // TODO: error?
    return null
  }

  return <Box p={4}>
    <Stack>
      <HStack>
        <Link href={issue?.html_url}>
          #{issueNumber}
        </Link>
        <Box w="80%">
          <Link href={issue?.html_url}>
            <Heading size="sm" >
              {issue?.title}
            </Heading>
          </Link>
        </Box>
      </HStack>
      <Box p={4} >
        <IssueBody issue={issue} />
      </Box>
      {/* <Box bg="red.100">
        {issue?.body}
      </Box> */}
    </Stack>
  </Box>
}
