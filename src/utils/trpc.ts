
import { createTRPCClient } from '@trpc/react'
import type { AppRouter } from "../services/trpc/AppRouter"
import { TrpcInput, TrpcInputs, TrpcPath, TrpcValue, useTrpcSWRQuery } from './trpcInfer'

/** @deprecated */
export const useAppClient = () => {
  return createTRPCClient<AppRouter>({
    url: `/api/trpc/`
  })
}

export const useAppQuery = (path: TrpcPath<AppRouter>, ...params: TrpcInputs<AppRouter>) => {
  const trpc = useAppClient()
  return useTrpcSWRQuery(trpc, path, ...params)
}