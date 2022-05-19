import { Octokit, App } from "octokit"
import { createAppAuth } from "@octokit/auth-app"
import { Endpoints, GetResponseDataTypeFromEndpointMethod } from "@octokit/types"
export type IssueParam = {
  owner: string,
  repo: string
}

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

// })


const octo = new Octokit()

// TODO

export type IssueResponsees = GetResponseDataTypeFromEndpointMethod<typeof octo.rest.issues.listForRepo>
export type IssueResponse = IssueResponsees[number]
// ReturnType>　//any  //Awaited<ReturnType<typeof app.rest.issues.listForRepo>>

export class GithubClient {
  client: Octokit
  token: string
  constructor(token: string) {
    this.token = token
    // console.log(app.eachInstallation)
    // const auth = createAppAuth({
    //   appId: process.env.GITHUB_APP_ID!,
    //   privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // })
    // console.log(auth)
    // this.client = new Octokit({ auth })

  }
  // async grant(param: IssueParam) {
  //   return app
  // }
  async getIssue(param: IssueParam): Promise<IssueResponsees> {
    const app = new Octokit({
      auth: this.token
    })

    const result = await app.rest.issues.listForRepo(param) //.issues.list(param)
    return result.data
  }
}
