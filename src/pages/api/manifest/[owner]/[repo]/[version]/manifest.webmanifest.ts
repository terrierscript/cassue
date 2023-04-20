import { NextApiHandler } from "next"
import { RepositoryQueryScheme } from "../../../../../../services/github/Schema"

export const handler: NextApiHandler = async (req, res) => {
  const { owner, repo } = RepositoryQueryScheme.parse(req.query)

  const manifest = {
    "background_color": "white",
    "description": "",
    "display": "standalone",
    "theme_color": "#444444",
    "icons": [
      {
        "src": "/icon.svg",
        "sizes": "150x150",
        "type": "image/svg",
        "purpose": "any"
      },
      {
        "src": "/icon.png",
        "sizes": "150x150",
        "type": "image/png",
        "purpose": "any"
      }
    ],
    "name": "Cassue",
    "short_name": "Cassue",
    "scope": "/",
    "start_url": `/issues/${owner}/${repo}`
  }
  res.setHeader("Content-Type", "application/manifest+json")
  res.json(manifest)
  return
}

export default handler