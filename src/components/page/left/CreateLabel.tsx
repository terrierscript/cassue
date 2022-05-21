import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { FC, useState } from "react"
import { RepositoryQuery } from "../../../services/github/Schema"

const LabelForm = () => {
  const [title, setTitle] = useState()

}
export const CreateLabel: FC<RepositoryQuery> = ({ owner, repo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return <>
    <Button variant={"outline"} onClick={onOpen}>
      Create new label
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
      </ModalContent>
      <ModalCloseButton />
      <ModalBody>

      </ModalBody>
    </Modal>
  </>
}
