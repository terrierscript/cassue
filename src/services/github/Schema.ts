import { z } from "zod"

export const RepositoryQueryScheme = z.object({
  owner: z.string(),
  repo: z.string(),
})
export type RepositoryQuery = z.infer<typeof RepositoryQueryScheme>


export const zStringNumber = z.preprocess(
  (a) => {
    const parse = z.string().safeParse(a)
    return parse.success
      ? parseInt(parse.data, 10)
      : null
  },
  z.number().positive()
)



export const IssueCommentQueryScheme = RepositoryQueryScheme.extend({
  number: zStringNumber
})

export type IssueCommentQuery = z.infer<typeof IssueCommentQueryScheme>

export const IssuesTargetQueryScheme = RepositoryQueryScheme.extend({
  filter: z.array(z.string()).optional().default([]),
  page: zStringNumber.optional()
})

export const IssuesTargetTypeValueScheme = z.object({
  target: z.enum(["labels", "issues", "comments"]),
  value: z.string(),
})

export type IssuesTargetTypeValue = z.infer<typeof IssuesTargetTypeValueScheme>

export type IssuesTargetQuery = z.infer<typeof RepositoryQueryScheme> & {
  filter?: string[]
  page?: number
}

export const IssuePostScheme = z.object({
  title: z.string(),
  labels: z.array(z.string()).optional() //.or(z.string()).optional()
})

export type IssuePost = z.infer<typeof IssuePostScheme>

export const IssueUpdateScheme = z.object({
  state: z.enum(["closed", "open"]).optional(),
  state_reason: z.string().optional(),
  body: z.string().optional()
})
export type IssueUpdate = z.infer<typeof IssueUpdateScheme>

export const CommentPostSchema = z.object({
  body: z.string()
})
export type CommentPost = z.infer<typeof CommentPostSchema>

export const IssueSearchScehme = z.object({
  state: z.enum(["open", "closed"]),
  labels: z.array(z.string()).optional()
})


export const LabelPostScheme = z.object({
  name: z.string(),
  color: z.string().optional(),
  description: z.string().optional()
})

export type LabelPost = z.infer<typeof LabelPostScheme>

