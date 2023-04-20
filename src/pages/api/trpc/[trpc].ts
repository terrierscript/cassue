import * as trpcNext from '@trpc/server/adapters/next'
import { getSessionAccount } from '../../../services/auth/getSessionAccount'
import { GithubClient } from '../../../services/github/GithubClient'
import { appRouter, AppRouter } from '../../../services/trpc/AppRouter'


// export API handler
export default trpcNext.createNextApiHandler<AppRouter>({
  router: appRouter,
  createContext: async ({ req }) => {
    const account = await getSessionAccount({ req })
    const githubClient = new GithubClient(account)
    return {
      account,
      githubClient
    }
  },
  onError(error) {
    console.error("Error")
  }
})