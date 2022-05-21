import { Spacer, Stack } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { IssueResponse } from "../../../services/github/GithubClient"
import { StreamIssue } from "./StreamIssue"

export const IssueStream: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  const stream = useMemo(() => {
    return issues?.concat().reverse()
  }, [issues])
  return <Stack spacing={0}>
    <Spacer />
    {stream.map((issue, key) => {
      return <StreamIssue issue={issue} key={key} />
    })}
  </Stack>

}
