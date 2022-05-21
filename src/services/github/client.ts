import { Octokit, App } from "octokit"
import { createAppAuth } from "@octokit/auth-app"
import { createOAuthUserAuth } from "@octokit/auth-oauth-user"
import { Endpoints, GetResponseDataTypeFromEndpointMethod } from "@octokit/types"
import { z } from "zod"
import { GithubAccount } from "../auth/getSessionAccount"

export const IssueParamScheme = z.object({
  owner: z.string(),
  repo: z.string(),
  filter: z.array(z.string()).optional()
})
export type IssueParam = z.infer<typeof IssueParamScheme>

export const IssuePostScheme = z.object({
  title: z.string(),

})
export type IssuePostParam = z.infer<typeof IssuePostScheme>

// const auth = createAppAuth({
//   appId: process.env.GITHUB_APP_ID!,
//   privateKey: process.env.GITHUB_APP_PRIVATE_KEY.replaceAll('\\n', "\n"),
//   clientId: process.env.GITHUB_CLIENT_ID!,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
// })

// const app = new App({
//   appId: process.env.GITHUB_APP_ID!,
//   privateKey: process.env.GITHUB_APP_PRIVATE_KEY.replaceAll('\\n', "\n"),
//   clientId: process.env.GITHUB_CLIENT_ID!,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET!,

const octo = new Octokit()

// TODO

export type IssueResponsees = GetResponseDataTypeFromEndpointMethod<typeof octo.rest.issues.listForRepo>
export type IssueResponse = IssueResponsees[number]
// ReturnType>　//any  //Awaited<ReturnType<typeof app.rest.issues.listForRepo>>

export class GithubClient {
  client: Octokit
  account: GithubAccount
  constructor(account: GithubAccount) {
    this.account = account
    this.client = new Octokit({
      auth: this.account.access_token,
    })

  }
  async getOwnerRepository(username: string) {
    return await this.client.rest.repos.listForUser({ username })
  }
  async getIssue(param: IssueParam): Promise<IssueResponsees> {

    const result = await this.client.rest.issues.listForRepo({
      ...param,
      // sort: "updated",
      direction: "desc"
    }) //.issues.list(param)
    return result.data
  }
  async postIssue(target: IssueParam, param: IssuePostParam) {
    const result = await this.client.rest.issues.create({
      ...target,
      ...param
    }) //.issues.list(param)
    return result.data

  }

}
