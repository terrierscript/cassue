import { z } from "zod"

export const RepositoryQueryScheme = z.object({
  owner: z.string(),
  repo: z.string(),
})
export type RepositoryQuery = z.infer<typeof RepositoryQueryScheme>

export const IssueCommentQueryScheme = RepositoryQueryScheme.extend({
  number: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive()
  )
})

export type IssueCommentQuery = z.infer<typeof IssueCommentQueryScheme>

export const IssuesTargetQueryScheme = RepositoryQueryScheme.extend({
  filter: z.array(z.string()).optional().default([])
})

export const IssuesTargetTypeValueScheme = z.object({
  target: z.enum(["labels", "issues", "comments"]),
  value: z.string()
})

export type IssuesTargetQuery = z.infer<typeof RepositoryQueryScheme> & {
  filter?: string[]
}

export const IssuePostScheme = z.object({
  title: z.string(),
  labels: z.array(z.string()).optional() //.or(z.string()).optional()
})

export type IssuePostParam = z.infer<typeof IssuePostScheme>

export const IssueSearchScehme = z.object({
  state: z.enum(["open", "closed"]),
  labels: z.array(z.string()).optional()
})


export const LabelPostScheme = z.object({
  name: z.string(),
})
export type LabelPost = z.infer<typeof LabelPostScheme>