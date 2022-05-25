import { Center, Flex, Spinner } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"
import { useCommentNumber } from "../useChatRouteParam"
import { CommentStreamLoader } from "../right/CommentStreamLoader"
import { IssueStreamLoader } from "./IssueStreamLoader"

export const StreamContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Flex
    overflow="scroll"
    w="100%"
    h="100%"
    flexDirection="column-reverse"
  >
    {children}
  </Flex>
}

export const Loading = () => {
  return <Flex h="100%" w="100%" overflow={"scroll"}>
    <Center h="50vh" w="100%" overflow={"scroll"}>
      <Spinner />
    </Center>
  </Flex>
}

// export const ChatStream: FC<{}> = ({ }) => {
//   const number = useCommentNumber()
//   if (number) {
//     return <CommentStreamLoader number={number} />
//   }
//   return <IssueStreamLoader />
// }

// export default ChatStream