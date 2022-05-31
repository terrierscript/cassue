import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { LabelPost, RepositoryQuery } from "../../../services/github/Schema"
import { fetchPost } from "../../../services/swr/fetcher"
import { useRouterValues } from "../useChatRouteParam"

const LabelForm: FC<RepositoryQuery> = (param) => {
  const { register, handleSubmit } = useForm<LabelPost>()
  const { owner, repo } = useRouterValues()
  return <form onSubmit={handleSubmit((data) => {
    console.log(data)
    fetchPost(`/api/issues/${owner}/${repo}/labels`, data)
  })}>
    <Stack>

      <Input {...register("name")} autoComplete="off" />
      <Button>Create</Button>
    </Stack>
  </form >
}
export const CreateLabel: FC<RepositoryQuery> = (param) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return <>
    <Button color="gray.500" variant={"outline"} onClick={onOpen}>
      Create new label
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new Label</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LabelForm {...param} />
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}
