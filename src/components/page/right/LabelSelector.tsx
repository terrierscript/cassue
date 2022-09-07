import { Box, HStack, IconButton, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, Wrap } from "@chakra-ui/react"
import { FC, PropsWithChildren, useMemo } from "react"
import { IssueResponse, LabelResponse } from "../../../services/github/GithubClient"

import { DuplicateIcon } from '@primer/octicons-react'
import { useRouterValues } from "../useChatRouteParam"
import { useLabels } from "../apiHooks"
import { isString } from "typesafe-utils"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  // onOpen: () => void
}

const LabelInnerContent: FC<{
  repoLabels: LabelResponse,
  issueLabels: string[]
}> = ({ repoLabels, issueLabels }) => {
  return <Stack>
    {repoLabels.map(label => {
      return <Box key={label.name} p={2}>
        {label.name}
      </Box>
    })}
  </Stack>
}

const LabelChangeModal: FC<PropsWithChildren<ModalProps>> = ({ isOpen, onClose, children }) => {
  return <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Change Labels</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </ModalContent>
  </Modal>

}
export const LabelSelector: FC<{ issue: IssueResponse }> = ({ issue }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { owner, repo } = useRouterValues()
  const { data } = useLabels({ owner, repo })
  const issueLabels = useMemo(() => {
    const labelNames = (issue.labels).flat(1).map(label => {
      return typeof label === "string" ? label : label.name
    }).filter(isString)
    return labelNames
  }, [issue])

  return <HStack>
    <Wrap>
      {issueLabels.map(labelName => {
        return <Box fontSize={"xs"}>
          {labelName}
        </Box>
      })}
    </Wrap>
    {(data?.labels) && <>
      <IconButton
        colorScheme={"gray"}
        icon={<DuplicateIcon />}
        aria-label={"Edit label"}
        size="xs"
        variant={"link"}
        onClick={() => onOpen()}
      />

      <LabelChangeModal
        onClose={onClose}
        isOpen={isOpen}
      >
        <LabelInnerContent repoLabels={data.labels} issueLabels={issueLabels} />
      </LabelChangeModal>
    </>}
  </HStack>
}
