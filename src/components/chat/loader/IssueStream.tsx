import { Box, Button } from "@chakra-ui/react"
import { FC, useEffect, useMemo } from "react"
import { IssueResponse } from "../../../services/github/GithubClient"
import { StreamMessage } from "../message/StreamMessage"
import { SendingMessage } from "./SendingMessage"
import { useScroll } from "./StreamContainer"


export const IssueStream: FC<{
  issues: IssueResponse[]
  onLoadMore: Function
  isLoading: boolean
}> = ({ issues, onLoadMore, isLoading }) => {
  const { scrollToBottom } = useScroll()
  // const ref = useRef<HTMLDivElement>(null)
  const stream = useMemo(() => {
    return issues
    // return issues?.concat().reverse()
  }, [issues])

  const latestNumber = useMemo(() => {
    return Math.max(...stream.map(issue => issue.number))
  }, [stream])
  useEffect(() => {
    scrollToBottom()
  }, [latestNumber])

  return <>
    <SendingMessage />
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
