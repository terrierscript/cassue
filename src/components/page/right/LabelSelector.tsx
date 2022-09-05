import { Box, Link, Wrap } from "@chakra-ui/react"
import { FC } from "react"
import { IssueResponse } from "../../../services/github/GithubClient"
import { NextLink } from "../../../services/next/components"



export const LabelSelector: FC<{ issue: IssueResponse }> = ({ issue }) => {
  return <Box>
    <Wrap>
      {(issue.labels).flat(1).map(label => {
        const labelName = typeof label === "string" ? label : label.name
        return <Box fontSize={"xs"}>
          {labelName}
        </Box>
      })}
    </Wrap>

  </Box>
}
