import { Box, Heading, HStack, Link, Stack } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"
import { IssueNumberResponse } from "../../../services/github/GithubClient"
import { useAlpha, useInverseAlpha } from "../../atomic/styleUtils"
import { HtmlBody } from "../../chat/message/HtmlBody"
import { ColorIssueStateIcon, useIssueIconColor } from "../../chat/message/IssueStateIcon"
import { useIssueComments } from "../apiHooks"
import { useChatRouteParam, useCommentNumber } from "../useChatRouteParam"
import { StateButtons } from "./StateButtons"

const IssueBodyContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  const bg = useInverseAlpha(50)
  return <Box bg={bg} p={4}>
    {children}
  </Box>
}

const IssueBody: FC<{ issue: IssueNumberResponse }> = ({ issue }) => {
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
        <HStack w="80%">
          <ColorIssueStateIcon issue={issue} />
          <Link href={issue?.html_url}>
            <Heading size="sm" >
              {issue?.title}
            </Heading>
          </Link>
        </HStack>
      </HStack>
      <IssueBodyContainer>
        <IssueBody issue={issue} />
      </IssueBodyContainer>
      <StateButtons issue={issue} />
      {/* <Box bg="red.100">
        {issue?.body}
      </Box> */}
    </Stack>
  </Box>
}

