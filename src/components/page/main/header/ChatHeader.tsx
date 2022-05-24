import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Divider, HStack, IconButton, Stack } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { IssuesTargetQuery } from "../../../../services/github/Schema"
import { NextLink } from "../../../../services/next/components"
import { useChatRouteParam, useFilterValue } from "../../useChatRouteParam"
import { Description } from "./Description"

const useTitle = () => {
  const { owner, repo, filter } = useChatRouteParam()
  const { target, value } = useFilterValue()
  if (target === "labels") {
    return value
  }
  return `${owner}/${repo}`
}

export const ChatHeader: FC<{}> = () => {
  const { owner, repo, filter } = useChatRouteParam()
  const title = useTitle()
  return <Stack p={4} spacing={1}>
    <HStack>
      <Box>
        <NextLink href={`/${owner}/${repo}`}>
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