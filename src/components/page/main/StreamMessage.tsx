import { Avatar, Box, HStack, Link, Spacer, Stack, useColorModeValue, Wrap } from "@chakra-ui/react"
import { FC, PropsWithChildren, useMemo } from "react"
import { formatDistance } from "date-fns"
import { IssueComementResponse, IssueResponse } from "../../../services/github/GithubClient"
import { useChatPageParams } from "../chatHooks"
import NextLink from "next/link"
import { useChatRouteParam, useFilterValue } from "../useChatRouteParam"

type Message = {
  messageType: "issue"
  data: IssueResponse
} | {
  messageType: "comment"
  data: IssueComementResponse
}
// type Postable2 = IssueComementResponse & IssueResponse

const IssueTitle: FC<{ message: Message }> = ({ message }) => {
  const { messageType, data } = message
  const linkLabel = useMemo(() => {
    if (messageType === "issue") {
      return `#${data.number}`
    }
    return data.id
  }, [messageType, data])
  return <HStack w="100%">
    <Box fontWeight={"bold"}>{data.user?.login}</Box>
    <Box fontSize={"sm"}>
      {formatDistance(new Date(data.updated_at), new Date())}
    </Box>
    <Spacer />
    {messageType === "issue" && <Box fontSize={"xs"} color="gray.500">
      <Link href={data.html_url} target="_blank">
        {linkLabel}
      </Link>
    </Box>}
  </HStack>
}



const MessageFooter: FC<{ message: Message }> = ({ message }) => {
  const params = useChatPageParams()
  const { messageType, data } = message
  if (messageType === "comment") {
    return null
  }
  if (!params) {
    return null
  }
  return <Box color="gray.500" fontSize={"sm"}>
    <Wrap >
      {(data.labels).flat(1).map(label => {
        const labelName = typeof label === "string" ? label : label.name
        return <NextLink key={labelName} href={`/${params.owner}/${params.repo}/labels/${labelName}`}>
          <Link>
            #{labelName}
          </Link>
        </NextLink>
      })}
    </Wrap>
    {data.comments > 0 && <Box>
      {data.comments} Comments
    </Box>}
  </Box>
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


const usePath = () => {
  const { owner, repo } = useChatRouteParam()
  const { target, value } = useFilterValue()
  return `/${owner}/${repo}/${target}/${value}`
}

const LinkMessage: FC<PropsWithChildren<{ message: Message }>> = ({ message, children }) => {
  const path = usePath()
  if (message.messageType === "comment") {
    return <>{children}</>
  }
  return <NextLink href={`/${path}/${message.data.number}`}>
    {children}
  </NextLink>
}
const MessageBody: FC<{ message: Message }> = ({ message }) => {
  const path = usePath()
  const { data, messageType } = message

  if (messageType === "comment") {
    return <Stack>
      <Box boxSizing="border-box" >
        <HtmlBody html={data.body_html ?? ""} />
      </Box>
    </Stack>
  }
  return <Stack>
    <NextLink href={`/${path}/${data.number}`}>
      <Link w="100%">
        <Box boxSizing="border-box" textOverflow={"ellipsis"}>
          {data.title}
        </Box>
      </Link>
    </NextLink>
  </Stack>
}

export const StreamMessage: FC<{ message: Message }> = ({ message }) => {
  const path = usePath()

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
    <LinkMessage message={message}>
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
    </LinkMessage>
  </Stack>
}
