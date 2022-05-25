import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Divider, HStack, IconButton, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { NextLink } from "../../../../services/next/components"
import { useChatRouteParam, useCommentNumber, useFilterValue } from "../../useChatRouteParam"
import { Description } from "./Description"

const useTitle = () => {
  const { owner, repo } = useChatRouteParam()
  const { target, value } = useFilterValue()
  if (target === "labels") {
    return value
  }
  return `${owner}/${repo}`
}

const useBackLink = () => {
  const { owner, repo } = useChatRouteParam()
  const { target, value } = useFilterValue()
  const number = useCommentNumber()
  if (number) {
    return `/${owner}/${repo}/${target}/${value}`
  }
  return `/${owner}/${repo}`

}

export const ChatHeader: FC<{}> = () => {
  const title = useTitle()
  const backLink = useBackLink()

  return <Stack p={4} spacing={1}>
    <HStack>
      <Box>
        <NextLink href={`${backLink}`}>
          <IconButton
            as="a"
            variant={"ghost"}
            colorScheme="gray"
            icon={<ChevronLeftIcon />} aria-label={"back to menu"}
          />
        </NextLink>
      </Box>
      <Box fontWeight="bold">
        # {title}
      </Box>
    </HStack>
    <Stack p={2} fontSize="xs">
      <Description />
    </Stack>
    <Divider />
  </Stack>
}

export default ChatHeader