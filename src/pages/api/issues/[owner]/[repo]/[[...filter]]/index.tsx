import { NextApiHandler } from "next"
import { getSessionAccount } from "../../../../../../services/auth/getSessionAccount"
import { GithubClient } from "../../../../../../services/github/GithubClient"
import { RepositoryQueryScheme, IssuePostScheme, IssuesTargetQueryScheme, IssuesTargetTypeValueScheme } from "../../../../../../services/github/Schema"


const getIssueHandler: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const accessor = new GithubClient(account)
  const param = IssuesTargetQueryScheme.parse(req.query)
  const [type, value] = param.filter
  const issues = await accessor.getAllIssue(param)
  res.json({
    issues
  })
}

const postIssueHandler: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const param = RepositoryQueryScheme.parse(req.query)
  const body = IssuePostScheme.parse(req.body)
  const accessor = new GithubClient(account)
  const issue = await accessor.postIssue(param, body)
  res.json(issue)
}

export const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    await postIssueHandler(req, res)
    return
  }

  await getIssueHandler(req, res)

}


export default handler