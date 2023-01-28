import { Box, HStack, SlideFade, Spinner } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import { chatInputAtom } from "../../../services/state/chatInputAtom"

export const SendingMessage = () => {
  const chatInputSending = useRecoilValue(chatInputAtom)
  if (!chatInputSending) {
    return null
  }
  return <SlideFade
    in={true}
  >
    <HStack p={4} color="gray.500">
      <Spinner size="xs" />
      <Box>Sending...</Box>
    </HStack>
  </SlideFade>
}
