import { Box, Spacer, Stack } from "@chakra-ui/react"
import { FC, useEffect, useMemo, useRef } from "react"
import { IssueComementResponse, IssueResponse } from "../../../services/github/GithubClient"
import { StreamMessage } from "../message/StreamMessage"

export const IssueStream: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  const ref = useRef<HTMLDivElement>(null)
  const stream = useMemo(() => {
    return issues?.concat().reverse()
  }, [issues])
  // const latestNumber = useMemo(() => issues[0]?.number, [issues])
  // useEffect(() => {
  //   console.log(ref.current?.scrollHeight)
  //   const s = ref.current?.scroll({
  //     behavior: "smooth",
  //     top: 0 // ref.current.scrollHeight
  //   })
  //   console.log(s)
  // }, [latestNumber])

  return <Stack spacing={0} ref={ref}>
    <Spacer />
    {stream.map((issue) => {
      return <Box key={issue.number}>
        <StreamMessage
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
  // const latestNumber = useMemo(() => comments.concat().reverse()[0]?.id, [comments])
  return <Stack spacing={0}>
    <Spacer />
    {stream.map((comment) => {
      return <StreamMessage message={{ messageType: "comment", data: comment }} key={comment.id} />
    })}
  </Stack>
}
