import { Spacer, Stack } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { IssueComementResponse, IssueResponse } from "../../../services/github/GithubClient"
import { StreamMessage } from "./StreamMessage"

export const IssueStream: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  const stream = useMemo(() => {
    return issues?.concat().reverse()
  }, [JSON.stringify(issues)])
  return <Stack spacing={0}>
    <Spacer />
    {stream.map((issue, key) => {
      return <StreamMessage message={{ type: "issue", data: issue }} key={key} />
    })}
  </Stack>

}
export const CommentStream: FC<{ comments: IssueComementResponse[] }> = ({ comments }) => {
  const stream = useMemo(() => {
    // return comments?.concat().reverse()
    return comments
  }, [JSON.stringify(comments)])
  return <Stack spacing={0}>
    <Spacer />
    {stream.map((comment, key) => {
      return <StreamMessage message={{ type: "comment", data: comment }} key={key} />
    })}
  </Stack>

}
