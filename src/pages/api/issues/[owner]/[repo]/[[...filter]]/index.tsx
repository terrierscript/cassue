import { NextApiHandler } from "next"
import { getSession } from "next-auth/react"
import { getSessionAccount } from "../../../../../../services/auth/getSessionAccount"
import { GithubClient, IssueParamScheme, IssuePostScheme } from "../../../../../../services/github/client"


const getIssueHandler: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const param = IssueParamScheme.parse(req.query)
  const accessor = new GithubClient(account)
  const issues = await accessor.getIssue(param)
  res.json({
    issues
  })
}

const postIssueHandler: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const param = IssueParamScheme.parse(req.query)
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