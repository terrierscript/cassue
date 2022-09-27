
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from "../services/trpc/AppRouter"
import { TrpcInputs, TrpcPath, useTrpcSWRQuery } from './trpcInfer'

export const useAppClient = () => {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  })
}

export const useAppQuery = <TPath extends TrpcPath<AppRouter>>(path: TPath, ...params: TrpcInputs<AppRouter>) => {
  const trpc = useAppClient()
  return useTrpcSWRQuery(trpc, path, ...params)
}