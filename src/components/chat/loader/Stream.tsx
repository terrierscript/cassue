import { Spacer, Stack } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { IssueComementResponse, IssueResponse } from "../../../services/github/GithubClient"
import { StreamMessage } from "../message/StreamMessage"

export const IssueStream: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  const stream = useMemo(() => {
    return issues?.concat().reverse()
  }, [issues])
  return <Stack spacing={0}>
    <Spacer />
    {stream.map((issue, key) => {
      return <StreamMessage message={{ messageType: "issue", data: issue }} key={key} />
    })}
  </Stack>

}

export const CommentStream: FC<{ comments: IssueComementResponse[] }> = ({ comments }) => {
  const stream = useMemo(() => {
    // return comments?.concat().reverse()
    return comments
  }, [comments])
  return <Stack spacing={0}>
    <Spacer />
    {stream.map((comment, key) => {
      return <StreamMessage message={{ messageType: "comment", data: comment }} key={key} />
    })}
  </Stack>
}
