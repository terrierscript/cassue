import { Heading, HStack, IconButton, Input, Link } from "@chakra-ui/react"
import { PencilIcon } from "@primer/octicons-react"
import { FC, useState } from "react"
import { IssueNumberResponse } from "../../../services/github/GithubClient"
import { useIssueUpdate } from "./useIssueUpdate"

const TitleEdit: FC<{ issue: IssueNumberResponse, onComplete: Function }> = ({ issue, onComplete }) => {
  const [value, setValue] = useState(issue.title)
  const [sending, setSending] = useState(false)
  const postIssue = useIssueUpdate(issue.number)

  const submit = async () => {
    setSending(true)
    await postIssue({ title: value })
    onComplete()
  }
  return <HStack>
    <Input disabled={sending}
      value={value} onChange={(e) => {
        setValue(e.target.value)
      }}
      onBlur={() => submit()}
    />
  </HStack>
}

export const IssueTitle: FC<{ issue: IssueNumberResponse }> = ({ issue }) => {

  const [editMode, setEditMode] = useState(false)
  if (editMode) {
    return <TitleEdit issue={issue} onComplete={() => setEditMode(false)} />
  }

  return <HStack>
    <Link href={issue?.html_url} target="_blank" rel="noreferrer external">
      <Heading size="sm">
        {issue?.title}
      </Heading>
    </Link>
    <IconButton
      onClick={() => setEditMode(true)}
      variant={"ghost"}
      aria-label={"Edit"}
      icon={<PencilIcon />} />
  </HStack>
}
