// import * as trpc from '@trpc/server'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { GithubAccount } from '../auth/getSessionAccount'
import { GithubClient } from '../github/GithubClient'
import { IssueCommentQueryScheme, IssueNumberQueryScheme, IssuePostScheme, IssuesTargetQueryScheme, IssueUpdateScheme, LabelPostScheme, RepositoryQueryScheme } from '../github/Schema'

export type AppRouterContext = {
  account: GithubAccount
  githubClient: GithubClient
}

const t = initTRPC.context<AppRouterContext>().create()


export const appRouter = t.router({
  repositoryMessages: t.procedure
    .input(IssuesTargetQueryScheme)
    .query(async ({ input, ctx }) => {
      const issues = await ctx.githubClient.getAllIssue(input)
      return { issues }
    }),
  postMessage: t.procedure
    .input(z.object({
      query: RepositoryQueryScheme,
      issue: IssuePostScheme
    }))
    .mutation(async ({ input, ctx }) => {
      const { query, issue } = input
      const issues = await ctx.githubClient.postIssue(query, issue)
      return { issues }
    }),
  updateIssue: t.procedure
    .input(z.object({
      query: IssueNumberQueryScheme,
      issue: IssueUpdateScheme
    }))
    .mutation(async ({ input, ctx }) => {
      const { query, issue } = input
      const issues = await ctx.githubClient.updateIssue(query, issue)
      return { issues }
    }),
  userRepos: t.procedure
    .input(z.object({
      username: z.string().optional().nullish()
    }))
    .query(async ({ ctx, input }) => {
      if (!input.username) {
        return {}
      }
      const repo = await ctx.githubClient.getOwnerRepositories(input?.username)

      return { repo }
    }),
  createLabel: t.procedure
    .input(z.object({
      repo: RepositoryQueryScheme,
      label: LabelPostScheme
    }))
    .mutation(async ({ input, ctx }) => {
      await ctx.githubClient.createCustomLabel(input.repo, input.label)
      return ctx.githubClient.getCustomLabels(input.repo)
    }),
  setLabel: t.procedure
    .input(z.object({
      labels: z.array(z.string()),
      query: IssueNumberQueryScheme,
    }))
    .mutation(async ({ input, ctx }) => {
      await ctx.githubClient.setLabels(input.query, input.labels)
      return ctx.githubClient.getIssue(input.query)
    }),
  labels: t.procedure
    .input(RepositoryQueryScheme)
    .query(async ({ input, ctx }) => {
      const labels = await ctx.githubClient.getCustomLabels(input)
      return { labels }
    })
})

// export type definition of API


export type AppRouter = typeof appRouter
