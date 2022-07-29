import { Center, HStack, Spinner, Box } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

export const CenterSpinner: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Center h="100vh">
    <HStack>
      <Spinner />
      <Box>{children}</Box>
    </HStack>
  </Center>
}