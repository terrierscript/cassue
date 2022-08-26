import { useAppClient } from "../../../utils/trpc"
import { useIssueComments } from "../apiHooks"
import { useRouterValues } from "../useChatRouteParam"

export const useIssuePost = (issueNumber: number) => {
  const { owner, repo } = useRouterValues()
  const trpc = useAppClient()
  const { mutate } = useIssueComments({
    owner,
    repo,
    number: issueNumber
  })

  return async (body: Record<string, string>) => {
    const result = await trpc.mutation("updateIssue", {
      query: { owner, repo, number: issueNumber },
      issue: body
    })

    await mutate()
    return result
  }
}
