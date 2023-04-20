import { z } from "zod"

export const RepositoryQueryScheme = z.object({
  owner: z.string(),
  repo: z.string(),
})
export type RepositoryQuery = z.infer<typeof RepositoryQueryScheme>


export const zStringNumber = z.preprocess(
  (value) => {
    const parse = z.string().safeParse(value)
    return parse.success
      ? parseInt(parse.data, 10)
      : null
  },
  z.number().positive()
)



export const IssueCommentQueryScheme = RepositoryQueryScheme.extend({
  // number: z.number()
  number: zStringNumber
})

export type IssueCommentQuery = z.infer<typeof IssueCommentQueryScheme>

export const IssueNumberQueryScheme = RepositoryQueryScheme.extend({
  number: z.number()
})

export type IssueNumberQuery = z.infer<typeof IssueNumberQueryScheme>

export const IssuesTargetQueryScheme = RepositoryQueryScheme.extend({
  filter: z.array(z.string()).optional().default([]),
  page: z.number().optional().nullable()
})

export const IssuesTargetTypeValueScheme = z.object({
  target: z.enum(["labels", "issues", "comments"]),
  value: z.string(),
})

export type IssuesTargetTypeValue = z.infer<typeof IssuesTargetTypeValueScheme>

export type IssuesTargetQuery = z.infer<typeof RepositoryQueryScheme> & {
  filter?: string[]
  page?: number | null
}

export const IssuePostScheme = z.object({
  title: z.string(),
  labels: z.array(z.string()).optional() //.or(z.string()).optional()
})

export type IssuePost = z.infer<typeof IssuePostScheme>

export const IssueUpdateScheme = z.object({
  title: z.string().optional(),
  state: z.enum(["closed", "open"]).optional(),
  state_reason: z.enum(["completed", "not_planned", "reopened"]).optional(),
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

