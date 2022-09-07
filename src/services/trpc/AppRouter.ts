import * as trpc from '@trpc/server'
import { z } from 'zod'
import { GithubAccount } from '../auth/getSessionAccount'
import { GithubClient } from '../github/GithubClient'
import { IssueCommentQueryScheme, IssueNumberQueryScheme, IssuePostScheme, IssuesTargetQueryScheme, IssueUpdateScheme, LabelPostScheme, RepositoryQueryScheme } from '../github/Schema'

export type AppRouterContext = {
  account: GithubAccount
  githubClient: GithubClient
}



export const appRouter = trpc
  .router<AppRouterContext>()
  .query("repositoryMessages", {
    input: IssuesTargetQueryScheme,
    async resolve({ input, ctx }) {
      const issues = await ctx.githubClient.getAllIssue(input)
      return { issues }
    }
  })
  .mutation("postMessage", {
    input: z.object({
      query: RepositoryQueryScheme,
      issue: IssuePostScheme
    }),
    async resolve({ input, ctx }) {
      const { query, issue } = input
      const issues = await ctx.githubClient.postIssue(query, issue)
      return { issues }
    }
  })
  .mutation("updateIssue", {
    input: z.object({
      query: IssueNumberQueryScheme,
      issue: IssueUpdateScheme
    }),
    async resolve({ input, ctx }) {
      const { query, issue } = input
      const issues = await ctx.githubClient.updateIssue(query, issue)
      return { issues }
    }
  })
  .query("userRepos", {
    input: z.object({
      username: z.string().optional().nullish()
    }),
    async resolve({ ctx, input }) {
      if (!input.username) {
        return {}
      }
      const repo = await ctx.githubClient.getOwnerRepositories(input?.username)

      return { repo }
    }
  })
  .mutation("createLabel", {
    input: z.object({
      repo: RepositoryQueryScheme,
      label: LabelPostScheme
    }),
    async resolve({ input, ctx }) {
      await ctx.githubClient.createCustomLabel(input.repo, input.label)
      return ctx.githubClient.getCustomLabels(input.repo)
    }
  })
  // .mutation("addLabel", {
  //   input: z.object({
  //     label: z.string(),
  //     query: IssueNumberQueryScheme,
  //   }),
  //   async resolve({ input, ctx }) {
  //     await ctx.githubClient.addLabel(input.query, [input.label])
  //     return ctx.githubClient.getIssue(input.query)
  //   }
  // })
  // .mutation("removeLabel", {
  //   input: z.object({
  //     label: z.string(),
  //     query: IssueNumberQueryScheme,
  //   }),
  //   async resolve({ input, ctx }) {
  //     await ctx.githubClient.removeLabel(input.query, input.label)
  //     return ctx.githubClient.getIssue(input.query)
  //   }
  // })
  .mutation("setLabel", {
    input: z.object({
      labels: z.array(z.string()),
      query: IssueNumberQueryScheme,
    }),
    async resolve({ input, ctx }) {
      await ctx.githubClient.setLabels(input.query, input.labels)
      return ctx.githubClient.getIssue(input.query)
    }
  })
  .query("labels", {
    input: RepositoryQueryScheme,
    async resolve({ input, ctx }) {
      const labels = await ctx.githubClient.getCustomLabels(input)
      return { labels }
    }
  })
// export type definition of API


export type AppRouter = typeof appRouter
