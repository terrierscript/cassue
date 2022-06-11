import { NextApiHandler } from "next/types"
import { z } from "zod"
import { getSessionAccount } from "../../../../../../services/auth/getSessionAccount"
import { GithubClient } from "../../../../../../services/github/GithubClient"
import { LabelPostScheme, RepositoryQueryScheme } from "../../../../../../services/github/Schema"

const LabelNameScheme = z.object({
  name: z.string()
})

const updateLabel: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const param = RepositoryQueryScheme.parse(req.query)
  const { name } = LabelNameScheme.parse(req.query)
  const body = LabelPostScheme.parse(req.body)
  // const convert = {
  //   ...body,
  //   color: body.color?.replace("#", "")
  // }
  const accessor = new GithubClient(account)
  try {
    await accessor.updateCustomLabel(param, name, body)
    res.status(200).end()
  } catch {
    res.status(500).end()
  }
}

export const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    return updateLabel(req, res)
  }
  res.status(400).end()
}