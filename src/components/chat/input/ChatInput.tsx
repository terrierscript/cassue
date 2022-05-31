import { HStack, IconButton, IconButtonProps, Input } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"

export const ChatInput: FC<{
  onSubmit: (value: string) => void
} & Pick<IconButtonProps, "icon">> = ({ onSubmit, icon }) => {
  const { register, handleSubmit, formState, reset, control, setFocus } = useForm<{ value: string }>()
  const watchValue = useWatch({ control, name: "value" })
  useEffect(() => {
    if (watchValue === "") {
      setFocus("value")
    }
  }, [watchValue])
  return <form onSubmit={handleSubmit(async (data) => {
    await onSubmit(data.value)
    reset()
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
