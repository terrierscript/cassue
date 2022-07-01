import { NextApiHandler } from "next"
import { getSessionAccount } from "../../../../../../services/auth/getSessionAccount"
import { GithubClient } from "../../../../../../services/github/GithubClient"
import { IssueCommentQueryScheme, IssueUpdateScheme } from "../../../../../../services/github/Schema"


export const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).end()
  }
  const account = await getSessionAccount({ req })

  const accessor = new GithubClient(account)
  const query = IssueCommentQueryScheme.parse(req.query)
  const body = IssueUpdateScheme.parse(req.body)
  const result = await accessor.updateIssue(query, body)
  console.log(query, body, result)
  res.json(result)
}

export default handler