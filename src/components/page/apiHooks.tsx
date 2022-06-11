import useSWR from "swr"
import useSWRInfinite from "swr/immutable"
import { IssueComementResponse, IssueNumberResponse, IssueResponse, LabelResponse, RepoResponse } from "../../services/github/GithubClient"
import { IssueCommentQuery, IssuesTargetQuery, IssuesTargetTypeValue, RepositoryQuery } from "../../services/github/Schema"
import { jsonFetcher } from "../../services/swr/fetcher"

export const useIssuesInfinate = ({ owner, repo, target, value }: RepositoryQuery & IssuesTargetTypeValue) => {
  return useSWRInfinite<{ issues: IssueResponse[] }>(`/api/messages/${owner}/${repo}/${target}/${value
    }`, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}

export const useIssueComments = ({ owner, repo, number }: IssueCommentQuery) => {
  return useSWR<{ comments: IssueComementResponse[], issue: IssueNumberResponse }>(`/api/comments/${owner}/${repo}/${number}`, jsonFetcher, {
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

const useRepo = ({ owner, repo }: RepositoryQuery) => {
  return useSWR<RepoResponse>(`/api/repos/${owner}/${repo}`, (url) => jsonFetcher(url).then(data => {
    return data.repo
  }))
}
export const useRepoExist = ({ owner, repo }: RepositoryQuery) => {
  const { data: repository, ...rest } = useRepo({ owner, repo })
  console.log({ repository })
  return {
    data: {
      exist: (repository !== null),
    },
    ...rest
  }
}

export const useIsRepoMaintainer = ({ owner, repo }: RepositoryQuery) => {
  const { data, ...rest } = useRepo({ owner, repo })
  console.log({ data })
  return {
    data: {
      isMaintainer: data?.permissions?.maintain === true,
    },
    ...rest
  }
}
