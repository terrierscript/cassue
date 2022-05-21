import { Avatar, Box, Center, Divider, Flex, Grid, HStack, Link, Spacer, Spinner, Stack, Textarea } from "@chakra-ui/react"
import { FC, Suspense, useMemo } from "react"
import { IssueResponse } from "../../services/github/client"
import { ChatInputArea } from "./ChatInput"
import { IssuePageProps } from "./Props"
import { useIssues } from "./useIssues"
import { use100vh } from 'react-div-100vh'
import { formatDistance } from "date-fns"
import { Rooms } from "./Rooms"

const activeStyle = {
  bg: "gray.50"
}
const Issue: FC<{ issue: IssueResponse }> = ({ issue }) => {
  return <Stack
    spacing={4}
    p={2}
    px={4}
    _active={activeStyle}
    _pressed={activeStyle}
    _hover={activeStyle}
  >
    <HStack spacing={4}>
      <Box alignSelf={"start"} py={2}>
        <Avatar size="sm"
          name={issue.user?.login}
          src={issue.user?.avatar_url}
        />
      </Box>
      <Stack spacing={0} w="100%">
        <HStack w="100%" >
          <Box fontWeight={"bold"}>{issue.user?.login}</Box>
          <Box fontSize={"sm"}>
            {formatDistance(new Date(issue.updated_at), new Date())}
          </Box>
          <Spacer />
          <Box fontSize={"xs"} color="gray.500">
            <Link href={issue.html_url} target="_blank" >
              #{issue.number}
            </Link>
          </Box>
        </HStack>
        <Stack>
          <Box>
            {issue.title}
          </Box>
        </Stack>
      </Stack>
    </HStack>
  </Stack>
}

const IssueStream: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  const stream = useMemo(() => {
    return issues?.concat().reverse()
  }, [issues])
  return <Stack spacing={0} >
    <Spacer
    // minH="100vh"
    />
    {stream.map((issue, key) => {
      return <Issue issue={issue} key={key} />
    })}
  </Stack>

}

const ChatHeader: FC<Omit<IssuePageProps, "issues">> = ({ owner, repo }) => {
  return <Box>
    <Box p={4} fontWeight="bold" >
      # {owner}/{repo}
    </Box>
    <Divider />
  </Box>
}

const IssueStreamWrap: FC<IssuePageProps> = ({ owner, repo, filter }) => {
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
export const IssueChatPage: FC<IssuePageProps> = ({ owner, repo, filter }) => {
  return <Box
    position="absolute"
    top={0} left={0} right={0} bottom={0}
  >
    <Grid h="100%" gridTemplateColumns={"max-content 1fr"}>
      <Rooms />
      <Grid
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
    </Grid>
  </Box>
}
