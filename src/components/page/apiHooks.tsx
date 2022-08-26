import useSWR from "swr"
import useSWRInfinite from "swr/infinite"
import { IssueComementResponse, IssueNumberResponse, IssueResponse, LabelResponse, RepoResponse } from "../../services/github/GithubClient"
import { IssuesTargetTypeValue, RepositoryQuery } from "../../services/github/Schema"
import { jsonFetcher } from "../../services/swr/fetcher"
import { useAppClient } from "../../utils/trpc"

export const useIssuesInfinate = ({ owner, repo, target, value }: RepositoryQuery & IssuesTargetTypeValue) => {
  const trpc = useAppClient()
  const result = useSWRInfinite<{ issues: IssueResponse[] }>(
    ((page, previous) => {
      if (previous && previous.issues.length === 0) {
        return null
      }
      return {
        query: "repositoryMessage",
        params: {
          owner,
          repo,
          filter: [target, value],
        },
        page,
      }
    }), (key) => {
      const { page } = key
      return trpc.query("repositoryMessages", {
        owner,
        repo,
        filter: [target, value],
        page,
      })
    }, {
    initialSize: 1,
    // fallbackData: { issues },
    // suspense: true
  })
  return result
}


type IssueCommentPartialQuery = {
  owner: string,
  repo: string,
  number: number | null
}
type IssueApiResponse = { comments: IssueComementResponse[], issue: IssueNumberResponse }

export const useIssueComments = ({ owner, repo, number }: IssueCommentPartialQuery) => {
  const url = `/api/comments/${owner}/${repo}/${number}`
  return useSWR<IssueApiResponse>(number ? url : null, jsonFetcher, {
    // fallbackData: { issues },
    // suspense: true
  })
}


export const useLabels = ({ owner, repo }: RepositoryQuery) => {
  const trpc = useAppClient()
  const param = { owner, repo }
  return useSWR<{ labels: LabelResponse }>(["query_labels", param], async () => {
    const result = await trpc.query("labels", param)
    console.log(result)
    return result
  }, {
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
  // console.log({ repository })
  return {
    data: {
      exist: (repository !== null),
    },
    ...rest
  }
}

export const useIsRepoMaintainer = ({ owner, repo }: RepositoryQuery) => {
  const { data, ...rest } = useRepo({ owner, repo })
  // console.log({ data })
  return {
    data: {
      isMaintainer: data?.permissions?.maintain === true,
    },
    ...rest
  }
}
