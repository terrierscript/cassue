import { IssueResponse } from "../../services/github/client"
import useSWR from "swr"
import { Props } from "../../pages/[owner]/[repo]/[[...filter]]/index"

const fetcher = url => fetch(url).then(r => r.json())

export const useIssues = ({ owner, repo, issues }: Props) => {
  return useSWR<{ issues: IssueResponse[] }>(`/api/issues/${owner}/${repo}`, fetcher, {
    fallbackData: { issues },
    suspense: true
  })
}
