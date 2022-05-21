import { NextApiHandler } from "next"
import { getSessionAccount } from "../../../../../services/auth/getSessionAccount"
import { GithubClient } from "../../../../../services/github/GithubClient"
import { IssueParamScheme } from "../../../../../services/github/Schema"

export const handler: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const param = IssueParamScheme.parse(req.query)
  const accessor = new GithubClient(account)
  const labels = await accessor.getCustomLabels(param)

  res.json({
    labels
  })
}

export default handler