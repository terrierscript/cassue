import { Avatar, Box, HStack, Link, Spacer, Stack, useColorModeValue, Wrap } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { formatDistance } from "date-fns"
import { IssueComementResponse, IssueResponse } from "../../../services/github/GithubClient"
import { useChatPageParams } from "../chatHooks"
import NextLink from "next/link"
import { useChatRouteParam } from "../useChatRouteParam"

type Message = {
  type: "issue"
  data: IssueResponse
} | {
  type: "comment"
  data: IssueComementResponse
}
// type Postable2 = IssueComementResponse & IssueResponse

const IssueTitle: FC<{ message: Message }> = ({ message: { type, data } }) => {
  const linkLabel = useMemo(() => {
    if (type === "comment") {
      return data.id
    }
    return `#${data.id}`
  }, [type, data])
  return <HStack w="100%">
    <Box fontWeight={"bold"}>{data.user?.login}</Box>
    <Box fontSize={"sm"}>
      {formatDistance(new Date(data.updated_at), new Date())}
    </Box>
    <Spacer />
    {type === "issue" && <Box fontSize={"xs"} color="gray.500">
      <Link href={data.html_url} target="_blank">
        #{linkLabel}
      </Link>
    </Box>}
  </HStack>
}

const MessageFooter: FC<{ message: Message }> = ({ message }) => {
  const params = useChatPageParams()
  const { type, data } = message
  if (type === "comment") {
    return null
  }
  if (!params) {
    return null
  }
  return <Wrap color="gray.500" fontSize={"sm"}>
    {(data.labels).flat(1).map(label => {
      const labelName = typeof label === "string" ? label : label.name
      return <NextLink key={labelName} href={`/${params.owner}/${params.repo}/labels/${labelName}`}>
        <Link>
          #{labelName}
        </Link>
      </NextLink>
    })}
    {data.comments > 0 && <Box>{data.comments} Comments</Box>}
  </Wrap>
}

const MessageAvatar: FC<{ message: Message }> = ({ message }) => {
  const { data } = message
  return <Avatar size="sm"
    name={data.user?.login}
    src={data.user?.avatar_url} />
}


const HtmlBody: FC<{ html: string }> = ({ html }) => {
  return <Box
    sx={{
      ul: {
        px: 4,
      }
    }}
    dangerouslySetInnerHTML={{ __html: html }}
  />

}

const MessageBody: FC<{ message: Message }> = ({ message }) => {
  const { owner, repo } = useChatRouteParam()
  const { data, type } = message

  if (type === "comment") {
    return <Stack>
      <Box boxSizing="border-box" >
        <HtmlBody html={data.body_html ?? ""} />
      </Box>
    </Stack>
  }
  return <Stack>
    <NextLink href={`/${owner}/${repo}/comments/${data.number}`}>
      <Link >
        <Box boxSizing="border-box" textOverflow={"ellipsis"}>
          {data.title}
        </Box>
      </Link>
    </NextLink>
  </Stack>
}

export const StreamMessage: FC<{ message: Message }> = ({ message }) => {
  const activeStyle = useColorModeValue(
    { bg: "blackAlpha.50" },
    { bg: "whiteAlpha.50" }
  )
  // const { owner, repo } = useChatRouteParam()
  const { data } = message
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
        <MessageAvatar message={message} />
      </Box>
      <Stack spacing={0} minW="0" w="100%">
        <IssueTitle message={message} />
        <MessageBody message={message} />
        <Stack>
          <MessageFooter message={message} />
        </Stack>
      </Stack>
    </HStack>
  </Stack>
}
