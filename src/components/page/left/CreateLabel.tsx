import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { LabelPost } from "../../../services/github/Schema"
import { fetchPost } from "../../../services/swr/fetcher"
import { useLabels } from "../apiHooks"
import { useRouterValues } from "../useChatRouteParam"
import { random } from "@ctrl/tinycolor"

const LabelForm: FC<{ onSubmit: Function }> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<LabelPost>({
    defaultValues: {
      color: `#${random().toHex()}`
    }
  })
  const { owner, repo } = useRouterValues()
  const { mutate } = useLabels({ owner, repo })

  return <form onSubmit={handleSubmit(async (data) => {
    const label = await fetchPost(`/api/issues/${owner}/${repo}/labels`, data)
    console.log(label)
    mutate()
    onSubmit()
  })}>
    <Stack>
      {/* <Label></Label> */}
      <Input {...register("name")} autoComplete="off" />
      {/* <Input {...register("description")} autoComplete="off" /> */}
      {/* TODO... */}
      <Input type="hidden" {...register("color")} autoComplete="off" />
      <Button type="submit">Create</Button>
    </Stack>
  </form >
}

export const CreateLabel: FC<{}> = ({ }) => {
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
          <LabelForm onSubmit={() => {
            onClose()

          }} />
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}
