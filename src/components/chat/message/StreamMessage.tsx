import { Avatar, Box, HStack, Link, Spacer, Stack, useColorModeValue, Wrap } from "@chakra-ui/react"
import { FC, PropsWithChildren, useEffect, useMemo, useRef } from "react"
import { formatDistance } from "date-fns"
import { IssueResponse, IssueComementResponse } from "../../../services/github/GithubClient"
import { useChatPageParams } from "../../page/chatHooks"
import { useChatRouteParam, useFilterValue } from "../../page/useChatRouteParam"
import NextLink from "next/link"
import { HtmlBody } from "./HtmlBody"
import { ColorIssueStateIcon, IssueStateIcon, useIssueIconColor } from "./IssueStateIcon"

type Message = {
  messageType: "issue"
  data: IssueResponse
} | {
  messageType: "comment"
  data: IssueComementResponse
}

const MessageHeaderTitle: FC<{ message: Message }> = ({ message }) => {
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
        return <NextLink key={labelName} href={`/issues/${params.owner}/${params.repo}/labels/${labelName}`}>
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


const usePath = () => {
  const { owner, repo } = useChatRouteParam()
  const { target, value } = useFilterValue()
  return `/issues/${owner}/${repo}/${target}/${value}`
}

const LinkMessage: FC<PropsWithChildren<{ message: Message }>> = ({ message, children }) => {
  const path = usePath()
  if (message.messageType === "comment") {
    return <>{children}</>
  }
  return <NextLink href={`${path}/${message.data.number}`}>
    {children}
  </NextLink>
}

const ComemntBody: FC<{ comment: IssueComementResponse }> = ({ comment }) => {
  return <Stack>
    <Box boxSizing="border-box" >
      <HtmlBody html={comment.body_html ?? ""} />
    </Box>
  </Stack>
}

const IssueBody: FC<{ issue: IssueResponse }> = ({ issue }) => {
  const color = useIssueIconColor(issue)
  return <HStack>
    <ColorIssueStateIcon issue={issue} />
    <Box boxSizing="border-box" textOverflow={"ellipsis"}>
      {issue.title}
    </Box>
  </HStack>
}

const MessageBody: FC<{ message: Message }> = ({ message }) => {
  const path = usePath()
  const { data, messageType } = message
  const closed = useMemo(() => {
    if (message.messageType !== "issue") {
      return false
    }
    return message.data.state !== "open"
  }, [])

  if (messageType === "comment") {
    return <Stack>
      <ComemntBody comment={data} />
    </Stack>
  }
  return <Stack opacity={closed ? 0.5 : 1}>
    <NextLink href={`${path}/${data.number}`} >
      <Link w="100%">
        <IssueBody issue={data} />
      </Link>
    </NextLink>
  </Stack>
}

export const StreamMessage: FC<{ message: Message }> = ({ message }) => {

  const activeStyle = useColorModeValue(
    { bg: "blackAlpha.50" },
    { bg: "whiteAlpha.50" }
  )
  return <Stack
    // ref={ref}
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
          <MessageHeaderTitle message={message} />
          <MessageBody message={message} />
          <Stack>
            <MessageFooter message={message} />
          </Stack>
        </Stack>
      </HStack>
    </LinkMessage>
  </Stack>
}
