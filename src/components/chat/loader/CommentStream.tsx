import { Box } from "@chakra-ui/react"
import { FC, useEffect, useMemo } from "react"
import { IssueComementResponse } from "../../../services/github/GithubClient"
import { StreamMessage } from "../message/StreamMessage"
import { useScroll } from "./StreamContainer"


export const CommentStream: FC<{ comments: IssueComementResponse[] }> = ({ comments }) => {
  const { scrollToBottom } = useScroll()
  const stream = useMemo(() => {
    return comments
    // return comments?.concat().reverse()
  }, [comments])

  const maxCommentId = useMemo(() => {
    return Math.max(...stream.map(comment => comment.id))
  }, [comments])

  useEffect(() => {
    scrollToBottom("smooth")
  }, [maxCommentId])
  return <>
    {stream.map((comment) => {
      return <Box key={comment.id}>
        <StreamMessage message={{ messageType: "comment", data: comment }} />
      </Box>
    })}
  </>
}
