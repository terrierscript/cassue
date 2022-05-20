import { Avatar, Box, Center, Divider, Flex, Grid, HStack, Link, Spacer, Spinner, Stack, Textarea } from "@chakra-ui/react"
import { FC, Suspense } from "react"
import { IssueResponse } from "../../services/github/client"
import { ChatInputArea } from "./ChatInput"
import { IssuePageProps } from "./Props"
import { useIssues } from "./useIssues"
import { use100vh } from 'react-div-100vh'

const Issue: FC<{ issue: IssueResponse }> = ({ issue }) => {
  return <Stack>
    <HStack spacing={4}>
      <Box alignSelf={"start"} py={2}>
        <Avatar size="sm"
          name={issue.user?.login}
          src={issue.user?.avatar_url}
        />
      </Box>
      <Stack spacing={0}>
        <HStack>
          <Box fontWeight={"bold"}>{issue.user?.login}</Box>
          <Box fontSize={"sm"}>{issue.updated_at}</Box>
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
  return <Stack spacing={4}>
    <Spacer
    // minH="100vh"
    />
    {issues?.concat().reverse().map((issue, key) => {
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
    return <Center minH="100vh">
      <Spinner />
    </Center>
  }
  return <IssueStream issues={data.issues} />
}
export const IssueChatPage: FC<IssuePageProps> = ({ owner, repo, filter }) => {
  const height = use100vh()
  return <Box
    w="100%" h={`calc(min(${height}px,100%,100vh))`}
    sx={{ touchAction: "none" }}
  // overflow={"hidden"} position="absolute"
  >
    <Box
      position="absolute"
      top={0} left={0} right={0} bottom={0}
    >
      <Grid gridTemplateRows={"1fr auto max-content"}
        // minH="-webkit-fill-available"
        h="100%"
      // h={height ?? "100%"}

      >
        <ChatHeader {...{ owner, repo, filter }} />
        <Flex overflow="scroll" w="100%"
          p={4}
          flexDirection="column-reverse"
        >
          <IssueStreamWrap  {...{ owner, repo, filter }} />
        </Flex >
        <Box bg="gray.200" p={2}>
          <ChatInputArea {...{ owner, repo }} />
        </Box>
      </Grid >
    </Box>
  </Box >
}
