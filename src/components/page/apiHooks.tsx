import { IssueResponse } from "../../services/github/GithubClient"
import useSWR from "swr"
import { IssuePageProps } from "./Props"

const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json())

export const useIssues = ({ owner, repo }: IssuePageProps) => {
  return useSWR<{ issues: IssueResponse[] }>(`/api/issues/${owner}/${repo}`, fetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}


export const useLabels = ({ owner, repo }: IssuePageProps) => {
  return useSWR<{ issues: IssueResponse[] }>(`/api/issues/${owner}/${repo}/labels`, fetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}
