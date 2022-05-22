import { ChevronLeftIcon } from "@chakra-ui/icons"
import { Box, Divider, HStack, IconButton, Stack } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { IssuesTargetQuery } from "../../../services/github/Schema"
import { NextLink } from "../../../services/next/components"
import { useLabel } from "../apiHooks"


const resolveFilter = (filter: string[]) => {
  const [type, value] = filter
  switch (type) {
    case "label":
      return
  }
  return {}
}

const LabelDescription: FC<any> = ({ owner, repo, label }) => {
  const { data } = useLabel({ owner, repo }, label)
  return <Box>{data.label?.description}</Box>
}
const Description: FC<IssuesTargetQuery> = ({ owner, repo, filter }) => {
  const [type, value] = filter ?? []

  if (type === "label") {
    return <LabelDescription {...{ owner, repo, label: value }} />
  }
  return null
}

export const ChatHeader: FC<IssuesTargetQuery> = ({ owner, repo, filter }) => {
  const { type, value } = useMemo(() => {
    const [type, value] = filter ?? []
    return { type, value }
  }, [filter])
  const title = useMemo(() => {
    if (type === "label") {
      return value
    }
    return `${owner}/${repo}`
  }, [repo, owner, type, value])
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
      <Description {...{ owner, repo, filter }} />
    </Stack>
    <Divider />
  </Stack>
}
