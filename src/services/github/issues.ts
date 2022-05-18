import { Octokit, App } from "octokit"
export type IssueParam = {
  org: string,
  repo: string
}

export class GithubAccessor {
  client: Octokit
  constructor() {
    this.client = new Octokit({ auth: "" })

  }
  getIssueGraph = (param: IssueParam) => {

  }
}
