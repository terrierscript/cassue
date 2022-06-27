import { Box, Button } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { IssueComementResponse, IssueResponse } from "../../../services/github/GithubClient"
import { StreamMessage } from "../message/StreamMessage"

export const IssueStream: FC<{
  issues: IssueResponse[],
  onLoadMore: Function,
  isLoading: boolean
}> = ({ issues, onLoadMore, isLoading }) => {
  // const ref = useRef<HTMLDivElement>(null)
  const stream = useMemo(() => {
    return issues
    // return issues?.concat().reverse()
  }, [issues])

  return <>
    {stream.map((issue) => {
      return <Box key={issue.number}>
        <StreamMessage
          message={{ messageType: "issue", data: issue }} />
      </Box>
    })}
    <Box p={2}>
      <Button w="100%"
        variant={"outline"} colorScheme="gray"
        onClick={() => onLoadMore()}
        isLoading={isLoading}
      >
        Load more
      </Button>
    </Box>
  </>
}


export const CommentStream: FC<{ comments: IssueComementResponse[] }> = ({ comments }) => {
  const stream = useMemo(() => {
    return comments
    // return comments?.concat().reverse()
  }, [comments])
  return <>
    {stream.map((comment) => {
      return <Box key={comment.id}>
        <StreamMessage message={{ messageType: "comment", data: comment }} />
      </Box>
    })}
  </>
}
