import { Box, Button, Collapse, HStack, Slide, SlideFade, Spinner, useDisclosure } from "@chakra-ui/react"
import { FC, useEffect, useMemo } from "react"
import { useRecoilValue } from "recoil"
import { IssueComementResponse, IssueResponse } from "../../../services/github/GithubClient"
import { chatInputAtom } from "../../../services/state/chatInputAtom"
import { StreamMessage } from "../message/StreamMessage"
import { useScroll } from "./StreamContainer"

const SendingMessage = () => {
  const chatInputSending = useRecoilValue(chatInputAtom)
  if (!chatInputSending) {
    return null
  }
  return <SlideFade
    in={true}
  >
    <HStack p={4} color="gray.500">
      <Spinner size="xs" />
      <Box>Sending...</Box>
    </HStack>
  </SlideFade>
}
export const IssueStream: FC<{
  issues: IssueResponse[],
  onLoadMore: Function,
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
