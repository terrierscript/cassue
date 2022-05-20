import { Box, Button, HStack, Input, Link } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, useMemo, useState } from "react"
import { RepoQueryProps } from "./Props"


const ReadOnlyMode: FC<RepoQueryProps> = ({ owner, repo }) => {

  return <HStack>
    <Button as="a"
      w="100%"
      colorScheme="gray"
      href={`https://github.com/${owner}/${repo}/issues/new`}>
      Open in Github
    </Button>
  </HStack>
}

const ChatInput: FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
  return <HStack>
    <Input bg="gray.50"
      onChange={(e) => onChange(e.target.value)}
      border={"2px solid"}
      _focus={{
        borderColor: "gray.400",
        // outlineColor: "gray.800"
        outline: "none"
      }} />
  </HStack>
}

const InputSending = () => {
  const [value, setValue] = useState("")
  return <ChatInput onChange={(value) => { setValue(value) }} />

}
export const ChatInputArea: FC<RepoQueryProps> = ({ owner, repo }) => {
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
  return <InputSending />
}
