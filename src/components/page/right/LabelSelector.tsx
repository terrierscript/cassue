import { Box, Button, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, useDisclosure, Wrap } from "@chakra-ui/react"
import { FC, useMemo, useState } from "react"
import { IssueResponse, LabelItem, LabelResponse } from "../../../services/github/GithubClient"
import { CheckIcon, DuplicateIcon } from '@primer/octicons-react'
import { useRouterValues } from "../useChatRouteParam"
import { useLabels } from "../apiHooks"
import { isString } from "typesafe-utils"
import { useInverseAlpha } from "../../chakra/styleUtils"
import { useAppClient } from "../../../utils/trpc"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  // onOpen: () => void
}

const LabelRowItem: FC<{
  label: LabelItem,
  selected: boolean,
  onChange: (label: string, selected: boolean) => void
}> = ({ label, selected, onChange }) => {
  const bg = useInverseAlpha(selected ? 300 : 200)
  const color = useInverseAlpha(800)

  return <HStack
    color={color} bg={bg}
    onClick={() => {
      onChange(label.name, !selected)
    }}
    p={2} fontSize="sm" borderRadius={8} cursor="pointer"
  >
    <Box>
      {label.name}
    </Box>
    <Spacer />
    <Box>{selected ? <CheckIcon /> : <></>}</Box>
  </HStack>
}
const LabelInnerContent: FC<{
  repoLabels: LabelResponse,
  selectedLabels: string[]
  onChange: (label: string, selected: boolean) => void
}> = ({ repoLabels, selectedLabels, onChange }) => {
  return <Stack>
    {repoLabels.map(label => {
      const selected = selectedLabels.includes(label.name)
      return <LabelRowItem selected={selected} label={label} key={label.name} onChange={(label, selected) => {
        onChange(label, selected)

      }} />
    })}
  </Stack>
}

const LabelChangeModal: FC<{
  repoLabels: LabelResponse,
  issueLabels: string[],
  onChangeLabel: () => void,
}> = ({ repoLabels, issueLabels, onChangeLabel }) => {
  const labelFlags = Object.fromEntries(issueLabels.map(label => [label, true]))
  const [selectLabelFlags, setSelectedLabelFlags] = useState(labelFlags)
  const selectedLabels = Object.entries(selectLabelFlags).filter(([_, value]) => value).map(([key]) => key)
  const trpc = useAppClient()
  const { owner, repo, number } = useRouterValues()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const send = () => {
    if (number === null) {
      // TODO: throw errors
      return
    }
    trpc.setLabel.mutate({ query: { owner, repo, number }, labels: selectedLabels }).then(() => {
      onChangeLabel()
    })
    onClose()
  }
  return <>
    <IconButton
      colorScheme={"gray"}
      icon={<DuplicateIcon />}
      aria-label={"Edit label"}
      size="xs"
      variant={"link"}
      onClick={() => onOpen()}
    />
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>Change Labels</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LabelInnerContent repoLabels={repoLabels} selectedLabels={selectedLabels}
            onChange={(label, selected) => {
              setSelectedLabelFlags((labels) => {
                return { ...labels, [label]: selected }
              })
            }} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => send()}>Send</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export const LabelSelector: FC<{
  issue: IssueResponse, onChangeLabel: () => void,

}> = ({ issue, onChangeLabel }) => {
  const { owner, repo } = useRouterValues()
  const { data } = useLabels({ owner, repo })
  const issueLabels = useMemo(() => {
    const labelNames = (issue.labels).flat(1).map(label => {
      return typeof label === "string" ? label : label.name
    }).filter(isString)
    return labelNames
  }, [issue])
  const onChange = () => {
    onChangeLabel()
  }
  return <HStack>
    <Wrap>
      {issueLabels.map(labelName => {
        return <Box fontSize={"xs"} key={labelName}>
          {labelName}
        </Box>
      })}
    </Wrap>
    {data?.labels && <LabelChangeModal issueLabels={issueLabels} repoLabels={data.labels}
      onChangeLabel={onChange}
    />}
  </HStack>
}
