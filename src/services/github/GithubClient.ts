import { Octokit } from "octokit"
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types"
import { RepositoryQuery, IssuePost, IssuesTargetQuery, IssueCommentQuery, CommentPost, LabelPost, IssueUpdate, IssueNumberQuery } from "./Schema"


const octokit = new Octokit()

// TODO

type IssueResponsees = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.listForRepo>
export type IssueResponse = IssueResponsees[number]

export type IssueNumberResponse = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.get>

type IssueCommentResponsees = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.listComments>
export type IssueComementResponse = IssueCommentResponsees[number]

export type RepoResponse = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.get>

const closeReason = ["complete", "not planned"] as const
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
    if (!account?.access_token) {
      this.client = new Octokit()
    } else {
      const authParam = {
        auth: this.account.access_token,
      }
      this.client = new Octokit(authParam)
    }

  }

  async getRepository(param: IssuesTargetQuery) {
    const result = await this.client.rest.repos.get(param)
    return result.data
  }
  async getOwnerRepositories(username: string) {
    const result = await this.client.rest.repos.listForUser({ username })
    return result.data
  }

  async getIssue(target: IssueCommentQuery): Promise<IssueNumberResponse> {
    const { number, ...rest } = target
    const result = await this.client.rest.issues.get({
      issue_number: number,
      ...rest,
      headers
    })
    return result.data
  }
  async getAllIssue(param: IssuesTargetQuery): Promise<IssueResponsees> {
    const { filter, page, ...repoParam } = param
    const filterQuery = resolveIssueListFilter(filter ?? [])

    const result = await this.client.rest.issues.listForRepo({
      ...repoParam,
      ...filterQuery,
      direction: "desc",
      page: page ?? 0,
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

  async addLabel(param: IssueCommentQuery, labels: string[]) {
    const { number, ...rest } = param
    const result = await this.client.rest.issues.addLabels({
      ...rest,
      issue_number: number,
      labels: labels,
    })
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

  async updateIssue(target: IssueNumberQuery, body: IssueUpdate) {
    const { number, ...rest } = target

    const result = await this.client.rest.issues.update({
      ...rest,
      issue_number: number,
      ...body,
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

  async createCustomLabel(param: RepositoryQuery, label: LabelPost) {
    await this.client.rest.issues.createLabel({
      ...param,
      ...label
    })
  }

  async updateCustomLabel(param: RepositoryQuery, label: LabelPost) {
    await this.client.rest.issues.updateLabel({
      ...param,
      ...label,
    })
  }

}
