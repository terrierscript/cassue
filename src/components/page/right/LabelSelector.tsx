import { Box, Button, HStack, IconButton, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, useDisclosure, Wrap } from "@chakra-ui/react"
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react"
import { IssueResponse, LabelItem, LabelResponse } from "../../../services/github/GithubClient"

import { CheckIcon, CommentIcon, DuplicateIcon } from '@primer/octicons-react'
import { useRouterValues } from "../useChatRouteParam"
import { useLabels } from "../apiHooks"
import { isString } from "typesafe-utils"
import { useAlpha, useInverseAlpha } from "../../chakra/styleUtils"
import { useAppClient } from "../../../utils/trpc"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  // onOpen: () => void
}

const LabelRowItem: FC<{ label: LabelItem, selected: boolean, onChangeLabel: () => void }> = ({ label, selected, onChangeLabel }) => {
  const [sending, setSending] = useState(false)
  const bg = useInverseAlpha(selected ? 300 : 200)
  const color = useInverseAlpha(800)
  const trpc = useAppClient()
  const { owner, repo, number } = useRouterValues()

  if (!number) {
    return null
  }
  const onClick = async () => {
    if (sending) {
      return
    }
    setSending(true)
    if (selected) {
      await trpc.mutation("removeLabel", { query: { repo, owner, number }, label: label.name })
    } else {
      await trpc.mutation("addLabel", { query: { repo, owner, number }, label: label.name })
    }
    onChangeLabel()
    setSending(false)

  }

  return <HStack
    opacity={sending ? 0.5 : 1}
    color={color} bg={bg}
    onClick={() => {
      onClick()
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
  issueLabels: string[]
  onChangeLabel: () => void
}> = ({ repoLabels, issueLabels, onChangeLabel }) => {

  return <Stack>
    {repoLabels.map(label => {
      const selected = issueLabels.includes(label.name)
      return <LabelRowItem selected={selected} label={label} key={label.name} onChangeLabel={onChangeLabel} />
    })}
  </Stack>
}

const LabelChangeModal: FC<{
  repoLabels: LabelResponse,
  issueLabels: string[],
  onChangeLabel: () => void,
}> = ({ repoLabels, issueLabels, onChangeLabel }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
          <LabelInnerContent repoLabels={repoLabels} issueLabels={issueLabels} onChangeLabel={onChangeLabel} />
        </ModalBody>
        {/* <ModalFooter>
          <Button>Send</Button>
        </ModalFooter> */}
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
        return <Box fontSize={"xs"}>
          {labelName}
        </Box>
      })}
    </Wrap>
    {data?.labels && <LabelChangeModal issueLabels={issueLabels} repoLabels={data.labels}
      onChangeLabel={onChange}
    />}
  </HStack>
}
