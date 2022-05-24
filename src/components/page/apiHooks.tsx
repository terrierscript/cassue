import useSWR from "swr"
import { IssueComementResponse, IssueResponse, LabelResponse } from "../../services/github/GithubClient"
import { IssueCommentQuery, IssuesTargetQuery, RepositoryQuery } from "../../services/github/Schema"
import { jsonFetcher } from "../../services/swr/fetcher"

export const useIssues = ({ owner, repo, filter }: IssuesTargetQuery) => {
  const filterQuery = filter?.join("/") ?? ""
  return useSWR<{ issues: IssueResponse[] }>(`/api/issues/${owner}/${repo}/${filterQuery}`, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}
export const useIssueComments = ({ owner, repo, number }: IssueCommentQuery) => {
  return useSWR<{ comments: IssueComementResponse[] }>(`/api/comments/${owner}/${repo}/${number}`, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}


export const useLabels = ({ owner, repo }: RepositoryQuery) => {
  return useSWR<{ labels: LabelResponse }>(`/api/issues/${owner}/${repo}/labels`, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}

// TODO: create api?
export const useLabel = ({ owner, repo }: RepositoryQuery, targetLabel: string) => {
  const { data, ...rest } = useLabels({ owner, repo })
  return {
    data: {
      label: data?.labels.find(label => label.name === targetLabel)
    },
    ...rest
  }
}