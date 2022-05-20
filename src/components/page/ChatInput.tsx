import { Box, Button, HStack, Input, Link } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, useMemo, useState } from "react"
import { createEditor, Descendant } from "slate"
import { withReact, Slate, Editable } from "slate-react"
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

const initialValue = [
  {
    type: "paragrahp",
    children: [{ text: '' }],
  },
]
const Editor = () => {
  // @ts-ignore
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState<Descendant[]>(initialValue)
  console.log(value)
  // Render the Slate context.
  return <Box bg="gray.100" w="100%" p={2}>
    <Slate editor={editor} value={value} onChange={(n) => setValue(n)}>
      <Editable />
    </Slate>
  </Box>
}

const ChatInput = () => {

  return <HStack>
    <Editor />
    {/* <Input bg="gray.50"
      border={"2px solid"}
      _focus={{
        borderColor: "gray.400",
        // outlineColor: "gray.800"
        outline: "none"
      }} /> */}
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

