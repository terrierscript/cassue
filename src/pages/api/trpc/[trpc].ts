import * as trpcNext from '@trpc/server/adapters/next'
import { getSessionAccount, GithubAccount } from '../../../services/auth/getSessionAccount'
import { appRouter, AppRouter } from '../../../services/trpc/AppRouter'


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