import { useIssueComments } from "../apiHooks"
import { useRouterValues } from "../useChatRouteParam"

export const useIssuePost = () => {
  const { owner, repo, number } = useRouterValues()
  const { mutate } = useIssueComments({
    owner, repo, number
  })

  return async (body: Record<string, string>) => {
    const result = await fetch(`/api/issues/${owner}/${repo}/${number}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(body)
    })

    await mutate()
    return result
  }
}
