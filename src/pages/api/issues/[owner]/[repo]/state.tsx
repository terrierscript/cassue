import { NextApiHandler } from "next"
import { getSessionAccount } from "../../../../../services/auth/getSessionAccount"
import { GithubClient } from "../../../../../services/github/GithubClient"


export const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).end()
  }
  const account = await getSessionAccount({ req })

  const accessor = new GithubClient(account)

  accessor.updateIssue()
  return res.json({})
}

export default handler