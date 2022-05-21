import { Button, HStack, Input } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, useMemo, useState } from "react"
import { IssueParam } from "../../services/github/Schema"
import { useIssues } from "./apiHooks"


const ReadOnlyMode: FC<IssueParam> = ({ owner, repo }) => {
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
      <Input bg="gray.50"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        border={"2px solid"}
        _focus={{
          borderColor: "gray.400",
          // outlineColor: "gray.800"
          outline: "none"
        }} />
    </HStack>
  </form>
}

const InputSending: FC<IssueParam> = ({ owner, repo }) => {
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
export const ChatInputArea: FC<IssueParam> = ({ owner, repo }) => {
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
