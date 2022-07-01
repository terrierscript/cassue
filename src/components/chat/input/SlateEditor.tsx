import { Box } from "@chakra-ui/react"
import { FC, useState } from "react"
import { createEditor, Descendant } from "slate"
import { withReact, Slate, Editable, useFocused, ReactEditor } from "slate-react"
import { Node } from 'slate'

const serialize = (nodes: Descendant[]) => {
  return nodes.map(n => Node.string(n)).join('\n')
}

export const SlateEditor: FC<{
  intialText: string[]
  onBlur: (text: string) => void,
  disabled: boolean
}> = ({ intialText = [], onBlur, disabled }) => {
  useFocused()
  const initialValue = intialText.map(text => {
    return {
      type: "paragrahp",
      children: [{ text }],
    }
  })
  // @ts-ignore
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const send = () => {
    const serialized = serialize(value)
    onBlur(serialized)
  }
  // Render the Slate context.
  return <Box bg="gray.100" w="100%" p={2} opacity={disabled ? 0.5 : 1}>
    <Slate
      editor={editor}
      value={value} onChange={(n) => setValue(n)}>
      <Editable
        readOnly={disabled}
        disabled={disabled}
        onBlur={() => {
          send()
        }}
        autoFocus
      />
    </Slate>
  </Box>
}
