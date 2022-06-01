import { NextApiHandler } from "next"
import { RepositoryQueryScheme } from "../../../../../services/github/Schema"

export const handler: NextApiHandler = async (req, res) => {
  const { owner, repo } = RepositoryQueryScheme.parse(req.query)

  const manifest = {
    "background_color": "white",
    "description": "",
    "display": "standalone",
    "icons": [
      {
        "src": "/icon.png",
        "sizes": "150x150",
        "type": "image/png",
        // "purpose": "any"
      }
    ],
    "name": "Cassue",
    "short_name": "Cassue",
    "start_url": `/${owner}/${repo}`
  }
  res.setHeader("Content-Type", "application/manifest+json")
  res.json(manifest)
  return
}

export default handler