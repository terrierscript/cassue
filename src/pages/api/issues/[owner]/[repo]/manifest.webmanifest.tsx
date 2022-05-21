import { NextApiHandler } from "next"
import { IssueParamScheme } from "../../../../../services/github/Schema"

export const handler: NextApiHandler = async (req, res) => {
  const { owner, repo } = IssueParamScheme.parse(req.query)

  const manifest = {
    "background_color": "white",
    "description": "",
    "display": "fullscreen",
    "icons": [
      {
        "src": "icon/icon.svg",
        "sizes": "192x192",
        "type": "image/svg"
      }
    ],
    "name": "chattiisue",
    "short_name": "chattiisue",
    "start_url": `/${owner}/${repo}`
  }
  res.setHeader("Content-Type", "application/manifest+json")
  res.json(manifest)
  return
}

export default handler