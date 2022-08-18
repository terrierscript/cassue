import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { z } from 'zod'
import { getSessionAccount, GithubAccount } from '../../../services/auth/getSessionAccount'
import { GithubClient } from '../../../services/github/GithubClient'

type Context = {
  account: GithubAccount
}
export const appRouter = trpc
  .router<Context>()
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

// export API handler
export default trpcNext.createNextApiHandler<AppRouter>({
  router: appRouter,
  createContext: async ({ req }) => {
    const account = await getSessionAccount({ req })
    return {
      account
    }
  }
})