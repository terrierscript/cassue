import { Center, Flex, Spinner } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"
import { useIssueComments, useIssues } from "../apiHooks"
import { CommentStream, IssueStream } from "./Stream"
import { useChatRouteParam, useFilterValue } from "../useChatRouteParam"

const StreamContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Flex
    overflow="scroll"
    w="100%"
    h="100%"
    flexDirection="column-reverse"
  >
    {children}
  </Flex>
}

const Loading = () => {
  return <Flex h="100%" w="100%" overflow={"scroll"}>
    <Center h="50vh" w="100%" overflow={"scroll"}>
      <Spinner />
    </Center>
  </Flex>
}

const IssueStreamLoader: FC<{}> = ({ }) => {
  const { owner, repo, filter } = useChatRouteParam()
  const { data } = useIssues({ owner, repo, filter })
  if (!data) {
    return <Loading />
  }
  return <StreamContainer>
    <IssueStream issues={data.issues} />
  </StreamContainer>
}

const CommentStreamLoader: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()
  const { value } = useFilterValue()
  const { data } = useIssueComments({ owner, repo, number: Number(value) })
  if (!data) {
    return <Loading />
  }
  return <StreamContainer>
    <CommentStream comments={data.comments} />
  </StreamContainer>
}

export const ChatStream: FC<{}> = ({ }) => {
  const { type } = useFilterValue()
  if (type === "comments") {
    return <CommentStreamLoader />
  }

  return <IssueStreamLoader />
}
