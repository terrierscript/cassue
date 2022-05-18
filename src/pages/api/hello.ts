import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
export default handler
