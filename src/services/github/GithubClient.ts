import { Octokit } from "octokit"
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types"
import { RepositoryQuery, IssuePostParam, IssuesTargetQuery } from "./Schema"


const octokit = new Octokit()

// TODO

export type IssueResponsees = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.listForRepo>
export type IssueResponse = IssueResponsees[number]
// ReturnType>　//any  //Awaited<ReturnType<typeof app.rest.issues.listForRepo>>


export type LabelResponse = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.issues.listLabelsForRepo>

const resolveFilter = (filter: string[]) => {
  const [type, value] = filter
  switch (type) {
    case "label":
      return { labels: value }
  }
  return {}
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

  async getAllIssue(param: IssuesTargetQuery): Promise<IssueResponsees> {
    const { filter, ...repoParam } = param
    const filterQuery = resolveFilter(filter ?? [])
    const result = await this.client.rest.issues.listForRepo({
      ...repoParam,
      ...filterQuery,
      state: "all",
      // sort: "updated",
      direction: "desc"
    }) //.issues.list(param)
    return result.data
  }

  async postIssue(target: RepositoryQuery, param: IssuePostParam) {
    const result = await this.client.rest.issues.create({
      ...target,
      ...param,
    }) //.issues.list(param)
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
