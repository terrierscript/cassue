import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { LabelPost } from "../../../services/github/Schema"
import { fetchPost } from "../../../services/swr/fetcher"
import { useLabels } from "../apiHooks"
import { useRouterValues } from "../useChatRouteParam"
import { random } from "@ctrl/tinycolor"
import { trpcHooks, useAppClient } from "../../../utils/trpc"

const LabelForm: FC<{ onSubmit: Function }> = ({ onSubmit }) => {
  const client = useAppClient()
  const { register, handleSubmit, formState } = useForm<LabelPost>({
    defaultValues: {
      color: `${random().toHex()}`
    }
  })
  const { owner, repo } = useRouterValues()
  const { mutate } = useLabels({ owner, repo })

  return <form onSubmit={handleSubmit(async (data) => {
    const input = {
      repo: { owner, repo },
      label: data
    }
    await client.mutation("createLabel", input)
    mutate()
    onSubmit()
  })}>
    <Stack>
      {/* <Label></Label> */}
      <Input {...register("name")} autoComplete="off" />
      {/* <Input {...register("description")} autoComplete="off" /> */}
      {/* TODO... */}
      <Input type="hidden" {...register("color")} autoComplete="off" />
      <Button type="submit" isLoading={formState.isSubmitting}  >Create</Button>
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
