import { NextApiHandler } from "next"
import { getSession } from "next-auth/react"
import { getSessionAccount } from "../../../../../../services/auth/getSessionAccount"
import { GithubClient } from "../../../../../../services/github/client"

export const handler: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const { owner, repo, filter } = req.query

  const accessor = new GithubClient(account)
  const issues = await accessor.getIssue({ owner, repo })

  res.json({
    issues
  })
}

export default handler