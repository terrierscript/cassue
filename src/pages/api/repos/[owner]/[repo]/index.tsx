import { NextApiHandler } from "next"
import { getSessionAccount } from "../../../../../services/auth/getSessionAccount"
import { GithubClient } from "../../../../../services/github/GithubClient"
import { RepositoryQueryScheme } from "../../../../../services/github/Schema"


export const handler: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const param = RepositoryQueryScheme.parse(req.query)
  const client = new GithubClient(account)
  try {
    const repo = await client.getRepository(param)
    res.json({ repo })
  } catch (e) {
    res.status(404).json({ repo: null })
  }
}

export default handler