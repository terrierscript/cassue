import { Avatar, Box, HStack, Link, Spacer, Stack, useColorModeValue } from "@chakra-ui/react"
import { FC } from "react"
import { IssueResponse } from "../../services/github/GithubClient"
import { formatDistance } from "date-fns"

export const Issue: FC<{ issue: IssueResponse }> = ({ issue }) => {
  const activeStyle = useColorModeValue({ bg: "blackAlpha.50" }, { bg: "whiteAlpha.50" })

  return <Stack
    spacing={4}
    p={2}
    px={4}
    _active={activeStyle}
    _pressed={activeStyle}
    _hover={activeStyle}
  >
    <HStack spacing={4} w="100%" cursor={"default"}>
      <Box alignSelf={"start"} py={2}>
        <Avatar size="sm"
          name={issue.user?.login}
          src={issue.user?.avatar_url} />
      </Box>
      <Stack spacing={0} minW="0" w="100%">
        <HStack w="100%">
          <Box fontWeight={"bold"}>{issue.user?.login}</Box>
          <Box fontSize={"sm"}>
            {formatDistance(new Date(issue.updated_at), new Date())}
          </Box>
          <Spacer />
          <Box fontSize={"xs"} color="gray.500">
            <Link href={issue.html_url} target="_blank">
              #{issue.number}
            </Link>
          </Box>
        </HStack>
        <Stack>
          <Box boxSizing="border-box" textOverflow={"ellipsis"}>
            {issue.title}
          </Box>
        </Stack>
      </Stack>
    </HStack>
  </Stack>
}
