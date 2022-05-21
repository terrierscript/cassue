import { NextApiHandler } from "next"
import { getSession } from "next-auth/react"
import { getSessionAccount } from "../../services/auth/getSessionAccount"
import { GithubClient } from "../../services/github/GithubClient"

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })
  const account = await getSessionAccount({ req })
  if (!account) {
    res.status(400)
    return
  }
  const client = new GithubClient(account)
  // @ts-ignore
  const repos = await client.getOwnerRepository(session?.user?.name)
  res.json({
    repos
  })
}
export default handler
