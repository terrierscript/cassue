import { Box, HStack, IconButton, IconButtonProps, Input } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"

export const ChatInput: FC<{
  onSubmit: (value: string) => void
} & Pick<IconButtonProps, "icon">> = ({ onSubmit, icon }) => {
  const { register, handleSubmit, formState, resetField, setFocus } = useForm<{ value: string }>()
  useEffect(() => {
    setFocus("value")
  }, [formState.submitCount])
  return <form onSubmit={handleSubmit(async (data) => {
    await onSubmit(data.value)
    resetField("value")
  })}>
    <HStack>
      <Input
        disabled={formState.isSubmitting}
        _light={{
          bg: "whiteAlpha.800"
        }}
        _dark={{
          bg: "blackAlpha.800"
        }}
        {...register("value")} />
      <IconButton
        disabled={formState.isSubmitting}
        type="submit"
        icon={icon}
        aria-label={"Post"} />
    </HStack>
  </form>
}
