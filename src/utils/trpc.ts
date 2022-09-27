import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from "../services/trpc/AppRouter"

export const useAppClient = () => {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  })
}

