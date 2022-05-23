import { z } from "zod"

export const RepositoryQueryScheme = z.object({
  owner: z.string(),
  repo: z.string(),
})
export type RepositoryQuery = z.infer<typeof RepositoryQueryScheme>

export const IssuesTargetQueryScheme = RepositoryQueryScheme.extend({
  filter: z.array(z.string()).optional().default([])
})

export const IssuesTargetTypeValue = z.object({
  type: z.enum(["labels", "issues"]),
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