import { Avatar, Box, Flex, HStack, Input, Link, Spacer, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { IssueResponse } from "../../services/github/client"

const Issue: FC<{ issue: IssueResponse }> = ({ issue }) => {
  return <Stack>
    <HStack spacing={4}>
      <Box w={8} alignSelf={"start"}>
        <Avatar size="full"
          name={issue.user.login}
          src={issue.user.avatar_url}
        />
      </Box>
      <Stack spacing={1}>
        <HStack>
          <Box fontWeight={"bold"}>{issue.user.login}</Box>
          <Box fontSize={"sm"}>{issue.updated_at}</Box>
        </HStack>
        <Stack>
          <Box>
            {issue.title}
          </Box>
        </Stack>
        <Box fontSize={"xs"} color="gray.500">
          <Link href={issue.html_url} target="_blank" >
            #{issue.number}
          </Link>
        </Box>
      </Stack>
    </HStack>
  </Stack>
}

export const ChatInput = () => {
  return <HStack>
    <Input bg="gray.50" ></Input>
  </HStack>
}

const IssueStream: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  return <Stack spacing={4}>
    <Spacer />
    {issues.map((issue, key) => {
      return <Issue issue={issue} key={key} />
    })}
  </Stack>

}
export const IssueChatPage: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  return <Stack minH="100vh">
    <Flex flexGrow={1} overflow="scroll" maxHeight={"90vh"} w="100%" p={4}>
      <IssueStream issues={issues} />
    </Flex>
    <Box flexShrink={0} bg="gray.200" h="10vh" p={2}>
      <ChatInput />
    </Box>
  </Stack >
}
