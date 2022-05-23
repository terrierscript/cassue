import { Avatar, Box, HStack, Link, Spacer, Stack, useColorModeValue } from "@chakra-ui/react"
import { FC } from "react"
import { formatDistance } from "date-fns"
import { IssueResponse } from "../../../services/github/GithubClient"
import { useChatPageParams } from "../chatHooks"
import NextLink from "next/link"
import { useChatRouteParam } from "../useChatRouteParam"

const IssueTitle: FC<{ issue: IssueResponse }> = ({ issue }) => {
  return <HStack w="100%">
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
}

const IssueFooter: FC<{ issue: IssueResponse }> = ({ issue }) => {
  const params = useChatPageParams()
  if (!params) {
    return null
  }
  return <Box color="gray.500" fontSize={"sm"}>
    {(issue.labels).flat(1).map(label => {
      const labelName = typeof label === "string" ? label : label.name
      return <NextLink key={labelName} href={`/${params.owner}/${params.repo}/labels/${labelName}`}>
        <Link>
          #{labelName}
        </Link>
      </NextLink>
    })}
  </Box>

}
export const StreamIssue: FC<{ issue: IssueResponse }> = ({ issue }) => {
  const activeStyle = useColorModeValue({ bg: "blackAlpha.50" }, { bg: "whiteAlpha.50" })
  const { owner, repo } = useChatRouteParam()

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
        <IssueTitle issue={issue} />
        <Stack>
          <Link href={`/${owner}/${repo}/issues/${issue.number}`}>
            <Box boxSizing="border-box" textOverflow={"ellipsis"}>
              {issue.title}
            </Box>
          </Link>
        </Stack>
        <Stack>
          <IssueFooter issue={issue} />
        </Stack>
      </Stack>
    </HStack>
  </Stack>
}
