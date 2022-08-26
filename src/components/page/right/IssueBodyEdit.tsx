import { FC, useState } from "react"
import { IssueNumberResponse } from "../../../services/github/GithubClient"
import { SlateEditor } from "../../chat/input/SlateEditor"
import { useIssueComments } from "../apiHooks"
import { useRouterValues } from "../useChatRouteParam"
import { useIssuePost } from "./useIssuePost"

export const IssueBodyEdit: FC<{
  issue: IssueNumberResponse
  onEditFinished: () => void
}> = ({ issue, onEditFinished }) => {
  const { owner, repo } = useRouterValues()
  const number = issue.number
  const postIssue = useIssuePost(number)
  const { mutate } = useIssueComments({
    owner, repo, number
  })
  const [disabled, setDisabled] = useState(false)

  const onBlurHandler = async (body: string) => {
    setDisabled(true)
    const result = await postIssue({
      body
    })
    await mutate()
    setDisabled(false)
    onEditFinished()
  }

  return <SlateEditor
    disabled={disabled}
    onBlur={value => {
      onBlurHandler(value)
    }}
    intialText={(issue.body ?? "").split("\n")}
  />
}
