import { Flex } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

export const StreamContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Flex
    overflow="scroll"
    w="100%"
    h="100%"
    flexDirection="column-reverse"
  >
    {children}
  </Flex>
}


