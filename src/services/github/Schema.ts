import { z } from "zod"

export const IssueParamScheme = z.object({
  owner: z.string(),
  repo: z.string(),
  filter: z.array(z.string()).optional()
})
export type IssueParam = z.infer<typeof IssueParamScheme>

export const IssuePostScheme = z.object({
  title: z.string(),
})
export type IssuePostParam = z.infer<typeof IssuePostScheme>

export const IssueSearchScehme = z.object({
  state: z.enum(["open", "closed"]),
  labels: z.array(z.string()).optional()
})