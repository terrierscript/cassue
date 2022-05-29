import { Octokit } from "octokit"
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types"
import { RepositoryQuery, IssuePost, IssuesTargetQuery, IssueCommentQuery, CommentPost } from "./Schema"


const octokit = new Octokit()

// TODO

type IssueResponsees = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.listForRepo>
export type IssueResponse = IssueResponsees[number]

export type IssueIssueNumberResponse = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.get>

type IssueCommentResponsees = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.listComments>
export type IssueComementResponse = IssueCommentResponsees[number]

const issueState = ["all", "closed", "open"] as const

const resolveIssueListFilter = (filter: string[] = []) => {
  const [type, value] = filter
  switch (type) {
    case "labels":
      return { labels: value }  
    case "issues":
      // @ts-ignore
      if (issueState.includes(value)) {
        return {
          state: value as (typeof issueState)[number]
        }
      }
      return {}
  }
  return {}
}


export type LabelResponse = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.listLabelsForRepo>

const headers = {
  accept: "application/vnd.github.VERSION.full+json"
}
export class GithubClient {
  client: Octokit
  account: Record<string, string>
  constructor(account: Record<string, string>) {
    this.account = account
    this.client = new Octokit({
      auth: this.account.access_token,
    })

  }


  async getIssue(target: IssueCommentQuery): Promise<IssueIssueNumberResponse> {
    const {number, ...rest} = target
    const result = await this.client.rest.issues.get({
      issue_number: number,
      ...rest,
    })
    return result.data
  }
  async getAllIssue(param: IssuesTargetQuery): Promise<IssueResponsees> {
    const { filter, ...repoParam } = param
    const filterQuery = resolveIssueListFilter(filter ?? [])
    const result = await this.client.rest.issues.listForRepo({
      ...repoParam,
      ...filterQuery,
      direction: "desc",
      headers
    }) //.issues.list(param)
    return result.data
  }

  async postIssue(target: RepositoryQuery, param: IssuePost) {
    const result = await this.client.rest.issues.create({
      ...target,
      ...param,
    }) //.issues.list(param)
    return result.data
  }

  async getComments(param: IssueCommentQuery) {
    const { number, ...rest } = param
    const result = await this.client.rest.issues.listComments({
      ...rest,
      issue_number: number,
      headers
    })
    return result.data
  }
  async postComment(target: IssueCommentQuery, body: CommentPost) {
    const { number, ...rest } = target
    const result = await this.client.rest.issues.createComment({
      ...rest,
      ...body,
      issue_number: number,
      headers
    })
    return result.data
  }

  async getCustomLabels(param: RepositoryQuery) {
    const result = await this.client.rest.issues.listLabelsForRepo({
      ...param,
    })

    return result.data.filter(label => {
      return label.default === false
    })
  }

}
