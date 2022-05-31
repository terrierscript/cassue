import { NextApiHandler } from "next"
import { getSessionAccount } from "../../../../../services/auth/getSessionAccount"
import { GithubClient } from "../../../../../services/github/GithubClient"
import { LabelPostScheme, RepositoryQueryScheme } from "../../../../../services/github/Schema"

export const getLabels: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const param = RepositoryQueryScheme.parse(req.query)
  const accessor = new GithubClient(account)
  const labels = await accessor.getCustomLabels(param)

  res.json({
    labels
  })
}


export const postLabel: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const param = RepositoryQueryScheme.parse(req.query)
  const body = LabelPostScheme.parse(req.body)
  const accessor = new GithubClient(account)
  console.log(param, body)
  const labels = await accessor.createCustomLabel(param, body)

  res.json({
    labels
  })
}

export const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    return postLabel(req, res)
  }
  return getLabels(req, res)
}

export default handler