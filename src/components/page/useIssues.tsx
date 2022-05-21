import { IssueResponse } from "../../services/github/client"
import useSWR from "swr"
import { IssuePageProps } from "./Props"
import { jsonFetcher } from "../../services/swr/fetcher"

export const useIssues = ({ owner, repo }: IssuePageProps) => {
  return useSWR<{ issues: IssueResponse[] }>(`/api/issues/${owner}/${repo}`, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}
