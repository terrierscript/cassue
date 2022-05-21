import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { LabelPost, RepositoryQuery } from "../../../services/github/Schema"

const LabelForm: FC<RepositoryQuery> = (param) => {
  const { register, handleSubmit } = useForm<LabelPost>()

  return <form onSubmit={handleSubmit((data) => {

  })}>
    <Input {...register("name")} autoComplete="off" />
  </form >
}
export const CreateLabel: FC<RepositoryQuery> = (param) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return <>
    <Button variant={"outline"} onClick={onOpen}>
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
