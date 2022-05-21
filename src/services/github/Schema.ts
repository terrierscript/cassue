import { z } from "zod"

export const RepositoryQueryScheme = z.object({
  owner: z.string(),
  repo: z.string(),
})
export type RepositoryQuery = z.infer<typeof RepositoryQueryScheme>

export const IssuesTargetQueryScheme = RepositoryQueryScheme.extend({
  filter: z.array(z.string()).optional().default([])
})

export type IssuesTargetQuery = z.infer<typeof RepositoryQueryScheme> & {
  filter?: string[]
}

export const IssuePostScheme = z.object({
  title: z.string(),
})

export type IssuePostParam = z.infer<typeof IssuePostScheme>

export const IssueSearchScehme = z.object({
  state: z.enum(["open", "closed"]),
  labels: z.array(z.string()).optional()
})