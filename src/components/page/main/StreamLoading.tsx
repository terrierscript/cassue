import { Center, Flex, Spinner } from "@chakra-ui/react"


export const StreamLoading = () => {
  return <Flex h="100%" w="100%" overflow={"scroll"}>
    <Center h="50vh" w="100%" overflow={"scroll"}>
      <Spinner />
    </Center>
  </Flex>
}
