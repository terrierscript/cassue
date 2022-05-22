import { Box, Center, Flex, Grid, Spinner } from "@chakra-ui/react"
import { FC } from "react"
import { ChatInputArea } from "./main/ChatInput"
import { useIssues } from "./apiHooks"
import { LeftSidebar } from "./left/LeftSidebar"
import { IssuesTargetQuery } from "../../services/github/Schema"
import { ChatHeader } from "./main/ChatHeader"
import { IssueStream } from "./main/IssueStream"


const IssueStreamWrap: FC<IssuesTargetQuery> = ({ owner, repo, filter }) => {
  const { data } = useIssues({ owner, repo, filter })
  if (!data) {
    return <Flex h="100%" w="100%" overflow={"scroll"}>
      <Center h="50vh" w="100%" overflow={"scroll"} >
        <Spinner />
      </Center>
    </Flex>
  }
  return <Flex
    overflow="scroll"
    w="100%"
    h="100%"
    flexDirection="column-reverse"
  >
    <IssueStream issues={data.issues} />
  </Flex >
}


export const IssueChatPage: FC<IssuesTargetQuery> = (params) => {
  return <Box
    position="absolute"
    top={0} left={0} right={0} bottom={0}
  >
    <Grid h="100%" gridTemplateColumns={{
      base: "auto",
      md: "max-content 1fr"
    }} >
      <Box display={{ base: "none", md: "block" }}>
        <LeftSidebar {...params} />
      </Box>
      <Grid
        minH={0}
        gridTemplateRows={"1fr auto max-content"}
        // minH="-webkit-fill-available"
        h="100%"
      // h={height ?? "100%"}
      >
        <ChatHeader {...params} />
        <IssueStreamWrap  {...params} />
        <Box
          _light={{ bg: "blackAlpha.50" }}
          _dark={{ bg: "whiteAlpha.50" }}
          p={2}>
          <ChatInputArea {...params} />
        </Box>
      </Grid>
    </Grid>
  </Box>
}
