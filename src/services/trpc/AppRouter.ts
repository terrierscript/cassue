import * as trpc from '@trpc/server'
import { z } from 'zod'
import { GithubAccount } from '../auth/getSessionAccount'
import { GithubClient } from '../github/GithubClient'

export type AppRouterContext = {
  account: GithubAccount
}


export const appRouter = trpc
  .router<AppRouterContext>()
  .query("userRepos", {
    input: z.object({
      username: z.string().optional().nullish()
    }),
    async resolve({ ctx, input }) {
      const account = ctx.account
      const client = new GithubClient(account)
      if (!input.username) {
        return {}
      }
      const repo = await client.getOwnerRepositories(input?.username)

      return { repo }
    }
  })
// export type definition of API


export type AppRouter = typeof appRouter
