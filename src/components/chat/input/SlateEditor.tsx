import { Box } from "@chakra-ui/react"
import { FC, useState } from "react"
import { createEditor, Descendant } from "slate"
import { withReact, Slate, Editable } from "slate-react"
import { Node } from 'slate'

const serialize = (nodes: Descendant[]) => {
  return nodes.map(n => Node.string(n)).join('\n')
}

const initialValue = [
  {
    type: "paragrahp",
    children: [{ text: '' }],
  },
]
export const SlateEditor: FC<{ onChange: (text: string) => void }> = ({ onChange }) => {
  // @ts-ignore
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const send = () => {
    const text = serialize(value)
    onChange(text)
  }
  // Render the Slate context.
  return <Box bg="gray.100" w="100%" p={2} border="2px solid"
    borderColor="gray.400"
    rounded="xl">
    <Slate editor={editor} value={value} onChange={(n) => setValue(n)}>
      <Editable onKeyDown={(event) => {
        if (event.code === "Enter") {
          send()
        }
      }} />
    </Slate>
  </Box>
}
