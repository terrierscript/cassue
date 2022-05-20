import { IssueResponse } from "../../services/github/client"
import useSWR from "swr"
import { IssuePageProps } from "./Props"

const fetcher = url => fetch(url).then(r => r.json())

export const useIssues = ({ owner, repo }: IssuePageProps) => {
  return useSWR<{ issues: IssueResponse[] }>(`/api/issues/${owner}/${repo}`, fetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}
