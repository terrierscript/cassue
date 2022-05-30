import { Box, Spacer, Stack } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { IssueComementResponse, IssueResponse } from "../../../services/github/GithubClient"
import { StreamMessage } from "../message/StreamMessage"

export const IssueStream: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  const stream = useMemo(() => {
    return issues?.concat().reverse()
  }, [issues])
  const latestNumber = useMemo(() => issues[0]?.number, [issues])

  return <Stack spacing={0} >
    <Spacer />
    {stream.map((issue) => {
      return <Box key={issue.number}>
        <StreamMessage
          isLatest={latestNumber === issue.number}
          message={{ messageType: "issue", data: issue }} />
      </Box>
    })}
  </Stack>
}

export const CommentStream: FC<{ comments: IssueComementResponse[] }> = ({ comments }) => {
  const stream = useMemo(() => {
    // return comments?.concat().reverse()
    return comments
  }, [comments])
  const latestNumber = useMemo(() => comments.concat().reverse()[0]?.id, [comments])
  return <Stack spacing={0}>
    <Spacer />
    {stream.map((comment) => {
      return <StreamMessage isLatest={comment.id === latestNumber} message={{ messageType: "comment", data: comment }} key={comment.id} />
    })}
  </Stack>
}
