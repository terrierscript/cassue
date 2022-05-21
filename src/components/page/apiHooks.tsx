import useSWR from "swr"
import { IssueResponse } from "../../services/github/GithubClient"
import { IssuesTargetQuery, RepositoryQuery } from "../../services/github/Schema"
import { jsonFetcher } from "../../services/swr/fetcher"

export const useIssues = ({ owner, repo }: IssuesTargetQuery) => {
  return useSWR<{ issues: IssueResponse[] }>(`/api/issues/${owner}/${repo}`, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}

export const useLabels = ({ owner, repo }: RepositoryQuery) => {
  return useSWR<{ issues: IssueResponse[] }>(`/api/issues/${owner}/${repo}/labels`, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}
