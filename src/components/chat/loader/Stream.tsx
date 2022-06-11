import { Box, Spacer, Stack } from "@chakra-ui/react"
import { FC, useEffect, useMemo, useRef } from "react"
import { IssueComementResponse, IssueResponse } from "../../../services/github/GithubClient"
import { StreamMessage } from "../message/StreamMessage"
import { StreamStack } from "./StreamContainer"

export const IssueStream: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  const ref = useRef<HTMLDivElement>(null)
  const stream = useMemo(() => {
    return issues
    return issues?.concat().reverse()
  }, [issues])
  return <>
    {stream.map((issue) => {
      return <Box key={issue.number}>
        <StreamMessage
          message={{ messageType: "issue", data: issue }} />
      </Box>
    })}
  </>
}

export const CommentStream: FC<{ comments: IssueComementResponse[] }> = ({ comments }) => {
  const stream = useMemo(() => {
    return comments
    // return comments?.concat().reverse()
  }, [comments])
  // const latestNumber = useMemo(() => comments.concat().reverse()[0]?.id, [comments])
  return <Box>
    <StreamStack>
      <Spacer />
      {stream.map((comment) => {
        return <StreamMessage message={{ messageType: "comment", data: comment }} key={comment.id} />
      })}
    </StreamStack>
  </Box>
}
