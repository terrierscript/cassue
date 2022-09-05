import { Box, HStack, IconButton, Link, Wrap } from "@chakra-ui/react"
import { FC } from "react"
import { IssueResponse } from "../../../services/github/GithubClient"

import { DuplicateIcon } from '@primer/octicons-react'


export const LabelSelector: FC<{ issue: IssueResponse }> = ({ issue }) => {
  return <HStack>
    <Wrap>
      {(issue.labels).flat(1).map(label => {
        const labelName = typeof label === "string" ? label : label.name
        return <Box fontSize={"xs"}>
          {labelName}
        </Box>
      })}
    </Wrap>
    <IconButton
      colorScheme={"gray"}
      icon={<DuplicateIcon />}
      aria-label={"Edit label"}
      size="xs"
      variant={"link"}
    />

  </HStack>
}
