import { Box, Heading, HStack, Link } from "@chakra-ui/react"
import { FC } from "react"
import { IssueNumberResponse } from "../../../services/github/GithubClient"
import { useAlpha, useInverseAlpha } from "../../atomic/styleUtils"
import { HtmlBody } from "../../chat/message/HtmlBody"
import { useIssueComments } from "../apiHooks"
import { useChatRouteParam, useCommentNumber } from "../useChatRouteParam"

export const CommentHeader: FC<{ issueNumber: number }> = ({ issueNumber }) => {
  const { owner, repo } = useChatRouteParam()
  const { data } = useIssueComments({ owner, repo, number: issueNumber })
  const bg = useInverseAlpha(100)
  const issue = data?.issue
  if (!issue) {
    // TODO: error?
    return null
  }

  return <Box p={4}>
    <Box>
      <HStack>
        <Link href={issue?.html_url}>
          #{issueNumber}
        </Link>
        <Link href={issue?.html_url}>
          <Box>
            <Heading size="sm">
              {issue?.title}
            </Heading>
          </Box>
        </Link>
      </HStack>
      <Box p={4} bg={bg}>
        {issue.body_html
          ? <HtmlBody html={issue.body_html} />
          : <Box>{issue.body}</Box>
        }
      </Box>
      {/* <Box bg="red.100">
        {issue?.body}
      </Box> */}
    </Box>
  </Box>
}
