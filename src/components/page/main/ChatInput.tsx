import { Box, Button, HStack, IconButton, Input } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, useMemo, useState } from "react"
import { IssuePostParam } from "../../../services/github/Schema"
import { useIssues } from "../apiHooks"
import { resolveFilterToPost } from "../../../services/github/resolveFilter"
import { BiSubdirectoryLeft } from "react-icons/bi"
import { useChatRouteParam } from "../useChatRouteParam"
import { alphaBgStyle } from "../../atomic/styleUtils"

const ReadOnlyMode: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()
  return <HStack>
    <Button as="a"
      w="100%"
      colorScheme="gray"
      href={`https://github.com/${owner}/${repo}/issues/new`}>
      Open in Github
    </Button>
  </HStack>
}

const ChatInput: FC<{ onSubmit: (value: string) => void }> = ({ onSubmit }) => {
  const [value, setValue] = useState("")
  return <form onSubmit={(e) => {
    e.preventDefault()
    onSubmit(value)
    setValue("")
  }}>
    <HStack>
      <Input
        _light={{
          bg: "whiteAlpha.800"
        }}
        _dark={{
          bg: "blackAlpha.800"
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      // border={"2px solid"}
      // _focus={{
      // _light: {
      //   borderColor: "blackAlpha.600",
      // },
      // _dark: {
      //   borderColor: "whiteAlpha.600",
      // },
      // outlineColor: "gray.800"
      // outline: "none"
      // }} 
      />
      <IconButton
        type="submit"
        icon={<BiSubdirectoryLeft />}
        aria-label={"Post"}
      />
    </HStack>
  </form>
}


const InputSending: FC<{}> = ({ }) => {
  const { owner, repo, filter } = useChatRouteParam()

  const { mutate } = useIssues({ owner, repo, filter })
  return <ChatInput onSubmit={async (v) => {
    const resolvedParams = resolveFilterToPost(filter)
    const issue: IssuePostParam = { title: v, ...resolvedParams }
    const result = await fetch(`/api/issues/${owner}/${repo}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(issue)
    })
    mutate()
    return result
  }} />
}


export const ChatInputAreaInner: FC<{}> = ({ }) => {
  const { owner } = useChatRouteParam()

  const { data } = useSession()
  const disabled = useMemo(() => {
    return (data?.user?.name !== owner)
  }, [data, owner])
  if (!data) {
    return null
  }
  if (disabled) {
    return <ReadOnlyMode />
  }
  return <InputSending />
}

export const ChatInputArea: FC<{}> = ({ }) => {
  return <Box p={2} {...alphaBgStyle(50)}>
    <ChatInputAreaInner />
  </Box>
}


export default ChatInputArea