import { IssueParam, IssueResponse } from "../../services/github/client"
import useSWR from "swr"
import { jsonFetcher } from "../../services/swr/fetcher"

export const useIssues = ({ owner, repo }: IssueParam) => {
  return useSWR<{ issues: IssueResponse[] }>(`/api/issues/${owner}/${repo}`, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}
