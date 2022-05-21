import { Octokit } from "octokit"
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types"
import { IssueParam, IssuePostParam } from "./Schema"


const octo = new Octokit()

// TODO

export type IssueResponsees = GetResponseDataTypeFromEndpointMethod<typeof octo.rest.issues.listForRepo>
export type IssueResponse = IssueResponsees[number]
// ReturnType>　//any  //Awaited<ReturnType<typeof app.rest.issues.listForRepo>>

export class GithubClient {
  client: Octokit
  account: Record<string, string>
  constructor(account: Record<string, string>) {
    this.account = account
    this.client = new Octokit({
      auth: this.account.access_token,
    })

  }

  async getAllIssue(param: IssueParam): Promise<IssueResponsees> {

    const result = await this.client.rest.issues.listForRepo({
      ...param,
      state: "all",
      // sort: "updated",
      direction: "desc"
    }) //.issues.list(param)
    return result.data
  }
  async postIssue(target: IssueParam, param: IssuePostParam) {
    const result = await this.client.rest.issues.create({
      ...target,
      ...param,
    }) //.issues.list(param)
    return result.data

  }
  async getCustomLabels(param: IssueParam): Promise<unknown> {
    const result = await this.client.rest.issues.listLabelsForRepo({
      ...param,
    })

    return result.data.filter(label => {
      return label.default === false
    })
  }

}
