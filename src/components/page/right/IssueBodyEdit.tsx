import { FC, useState } from "react"
import { IssueNumberResponse } from "../../../services/github/GithubClient"
import { SlateEditor } from "../../chat/input/SlateEditor"
import { useIssueComments } from "../apiHooks"
import { useRouterValues } from "../useChatRouteParam"

export const IssueBodyEdit: FC<{
  issue: IssueNumberResponse
  onEditFinished: () => void
}> = ({ issue, onEditFinished }) => {
  const { owner, repo } = useRouterValues()
  const number = issue.number
  const { mutate } = useIssueComments({
    owner, repo, number
  })
  const [disabled, setDisabled] = useState(false)


  const onBlurHandler = async (body: string) => {
    setDisabled(true)
    console.log("x")
    const result = await fetch(`/api/issues/${owner}/${repo}/${number}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        body
      })
    })
    console.log("y")
    await mutate()
    setDisabled(false)
    onEditFinished()
    console.log("z")
  }
  return <SlateEditor
    disabled={disabled}
    onBlur={value => {
      onBlurHandler(value)
    }}
    intialText={(issue.body ?? "").split("\n")} />
}
