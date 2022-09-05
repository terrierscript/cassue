import { Box, HStack, Link, Spacer, Stack } from "@chakra-ui/react"
import { FC, PropsWithChildren, useState } from "react"
import { IssueNumberResponse } from "../../../services/github/GithubClient"
import { useInverseAlpha } from "../../chakra/styleUtils"
import { ColorIssueStateIcon } from "../../chat/message/IssueStateIcon"
import { useIssueComments } from "../apiHooks"
import { useChatRouteParam, useRouterValues } from "../useChatRouteParam"
import { IssueBodyEdit } from "./IssueBodyEdit"
import { IssueBodyText } from "./IssueBodyText"
import { StateButtons } from "./StateButtons"
import { IssueTitle } from "./IssueTitle"
import { LabelSelector } from "./LabelSelector"

const IssueBodyContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  const bg = useInverseAlpha(50)
  return <Box bg={bg} p={4}>
    {children}
  </Box>
}

const IssueBody: FC<{ issue: IssueNumberResponse }> = ({ issue }) => {
  const [editMode, setEditMode] = useState(false)
  const { owner, repo } = useRouterValues()
  const { mutate } = useIssueComments({ owner, repo, number: issue.number })
  if (editMode) {
    return <IssueBodyEdit issue={issue}
      onEditFinished={() => {
        setEditMode(false)
        mutate()
      }}
    />
  }
  return <Box onClick={() => setEditMode(true)}>
    <IssueBodyText issue={issue} />
  </Box>
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
          <IssueTitle issue={issue} />
        </HStack>
      </HStack>
      <IssueBodyContainer>
        <IssueBody issue={issue} />
      </IssueBodyContainer>
      <HStack>
        <LabelSelector issue={issue} />
        <Spacer />
        <StateButtons issue={issue} />
      </HStack>
      {/* <Box bg="red.100">
        {issue?.body}
      </Box> */}
    </Stack>
  </Box>
}

