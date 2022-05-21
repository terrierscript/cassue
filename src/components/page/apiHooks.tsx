import useSWR from "swr"
import { IssueResponse } from "../../services/github/GithubClient"
import { IssuesTargetQuery, RepositoryQuery } from "../../services/github/Schema"
import { jsonFetcher } from "../../services/swr/fetcher"

export const useIssues = ({ owner, repo, filter }: IssuesTargetQuery) => {
  const filterQuery = filter?.join("/") ?? ""
  return useSWR<{ issues: IssueResponse[] }>(`/api/issues/${owner}/${repo}/${filterQuery}`, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}

export const useLabels = ({ owner, repo }: RepositoryQuery) => {
  return useSWR<{ labels: { name: string }[] }>(`/api/issues/${owner}/${repo}/labels`, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}
