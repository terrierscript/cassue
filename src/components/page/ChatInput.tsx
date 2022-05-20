import { Box, Button, HStack, Input, Link } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, useMemo } from "react"
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

const ChatInput = () => {

  return <HStack>
    <Input bg="gray.50"
      border={"2px solid"}
      _focus={{
        borderColor: "gray.400",
        // outlineColor: "gray.800"
        outline: "none"
      }} />
  </HStack>
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
  return <ChatInput />
}
