import { NextApiHandler } from "next"
import { getSessionAccount } from "../../../../../../services/auth/getSessionAccount"
import { GithubClient } from "../../../../../../services/github/GithubClient"
import { CommentPostSchema, IssueCommentQueryScheme } from "../../../../../../services/github/Schema"

const getIssueCommentHandler: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const accessor = new GithubClient(account)
  const param = IssueCommentQueryScheme.parse(req.query)
  const comments = await accessor.getComments(param)

  const issue = await accessor.getIssue(param)
  res.json({
    issue,
    comments,
  })
}

const postIssueCommentHandler: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const accessor = new GithubClient(account)
  const param = IssueCommentQueryScheme.parse(req.query)
  const body = CommentPostSchema.parse(req.body)
  const issue = await accessor.postComment(param, body)
  res.json(issue)
}

export const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    await postIssueCommentHandler(req, res)
    return
  }

  await getIssueCommentHandler(req, res)

}


export default handler