import { NextApiHandler } from "next"
import { RepositoryQueryScheme } from "../../../../../../services/github/Schema"

export const handler: NextApiHandler = async (req, res) => {
  const { owner, repo } = RepositoryQueryScheme.parse(req.query)

  const manifest = {
    "background_color": "white",
    "description": "",
    "display": "standalone",
    "theme_color": "#333333",
    "icons": [
      {
        "src": "/icon.svg",
        "sizes": "150x150",
        "type": "image/svg",
        "purpose": "any"
      }
    ],
    "name": "Cassue",
    "short_name": "Cassue",
    "start_url": `/issues/${owner}/${repo}`
  }
  res.setHeader("Content-Type", "application/manifest+json")
  res.json(manifest)
  return
}

export default handler