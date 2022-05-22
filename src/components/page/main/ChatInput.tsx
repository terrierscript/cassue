import { Button, HStack, IconButton, Input } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, useMemo, useState } from "react"
import { RepositoryQuery } from "../../../services/github/Schema"
import { useIssues } from "../apiHooks"
import { ArrowCircleRightIcon, PaperAirplaneIcon } from "@heroicons/react/solid"

const ReadOnlyMode: FC<RepositoryQuery> = ({ owner, repo }) => {
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
        p={2}
        icon={<PaperAirplaneIcon />}
        aria-label={"Post"}
      />
    </HStack>
  </form>
}

const InputSending: FC<RepositoryQuery> = ({ owner, repo }) => {
  const { mutate } = useIssues({ owner, repo })
  return <ChatInput onSubmit={async (v) => {
    const result = await fetch(`/api/issues/${owner}/${repo}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ title: v })
    })
    mutate()
  }} />
}

export const ChatInputArea: FC<RepositoryQuery> = ({ owner, repo }) => {
  const { data } = useSession()
  const disabled = useMemo(() => {
    return (data?.user?.name !== owner)
  }, [data, owner])
  if (!data) {
    return null
  }
  if (disabled) {
    return <ReadOnlyMode {...{ owner, repo }} />
  }
  return <InputSending  {...{ owner, repo }} />
}
