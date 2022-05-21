import { Octokit, App } from "octokit"
import { createAppAuth } from "@octokit/auth-app"
import { createOAuthUserAuth } from "@octokit/auth-oauth-user"
import { Endpoints, GetResponseDataTypeFromEndpointMethod } from "@octokit/types"
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

  async getIssue(param: IssueParam): Promise<IssueResponsees> {

    const result = await this.client.rest.issues.listForRepo({
      ...param,
      state: "closed",
      state_reason: "not_planned",
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

}
