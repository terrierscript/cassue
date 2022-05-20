import { IssueResponse } from "../../services/github/client"


export type RepoQueryProps = {
  owner: string
  repo: string
}

export type IssuePageProps = {
  // issues: IssueResponse[]
  filter?: string
} & RepoQueryProps
