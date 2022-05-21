import { Box, Center, Flex, Grid, Spacer, Spinner, Stack } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { IssueResponse } from "../../services/github/GithubClient"
import { ChatInputArea } from "./main/ChatInput"
import { useIssues } from "./apiHooks"
import { StreamIssue } from "./main/StreamIssue"
import { LeftSidebar } from "./left/LeftSidebar"
import { IssueParam } from "../../services/github/Schema"
import { ChatHeader } from "./main/ChatHeader"


const IssueStream: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  const stream = useMemo(() => {
    return issues?.concat().reverse()
  }, [issues])
  return <Stack spacing={0} >
    <Spacer
    // minH="100vh"
    />
    {stream.map((issue, key) => {
      return <StreamIssue issue={issue} key={key} />
    })}
  </Stack>

}

const IssueStreamWrap: FC<IssueParam> = ({ owner, repo, filter }) => {
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

export const IssueChatPage: FC<IssueParam> = ({ owner, repo, filter }) => {
  return <Box
    position="absolute"
    top={0} left={0} right={0} bottom={0}
  >
    <Grid h="100%" gridTemplateColumns={{
      base: "auto",
      md: "max-content 1fr"
    }} >
      <Box display={{ base: "none", md: "block" }}>
        <LeftSidebar {...{ owner, repo, filter }} />
      </Box>
      <Grid
        minH={0}
        gridTemplateRows={"1fr auto max-content"}
        // minH="-webkit-fill-available"
        h="100%"
      // h={height ?? "100%"}
      >
        <ChatHeader {...{ owner, repo, filter }} />
        <IssueStreamWrap  {...{ owner, repo, filter }} />
        <Box bg="gray.200" p={2}>
          <ChatInputArea {...{ owner, repo }} />
        </Box>
      </Grid >
    </Grid >
  </Box >
}
