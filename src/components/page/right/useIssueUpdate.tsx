import { IssueUpdate } from "../../../services/github/Schema"
import { useAppClient } from "../../../utils/trpc"
import { useIssueComments } from "../apiHooks"
import { useRouterValues } from "../useChatRouteParam"

export const useIssueUpdate = (issueNumber: number) => {
  const { owner, repo } = useRouterValues()
  const trpc = useAppClient()
  const { mutate } = useIssueComments({
    owner,
    repo,
    number: issueNumber
  })

  return async (body: IssueUpdate) => {
    const result = await trpc.updateIssue.mutate({
      query: { owner, repo, number: issueNumber },
      issue: body
    })

    await mutate()
    return result
  }
}
