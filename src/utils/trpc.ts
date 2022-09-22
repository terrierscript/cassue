
import { createTRPCClient } from '@trpc/react'
import type { AppRouter } from "../services/trpc/AppRouter"
import { TrpcInputs, TrpcPath, useTrpcSWRQuery } from './trpcInfer'

/** @deprecated */
export const useAppClient = () => {
  return createTRPCClient<AppRouter>({
    url: `/api/trpc/`
  })
}

export const useAppQuery = <TPath extends TrpcPath<AppRouter>>(path: TPath, ...params: TrpcInputs<AppRouter>) => {
  const trpc = useAppClient()
  return useTrpcSWRQuery(trpc, path, ...params)
}