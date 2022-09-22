import { TRPCClient } from "@trpc/client"
import { AnyRouter, inferHandlerInput } from "@trpc/server"
import useSWR from "swr"


export type TrpcPath<TRouter extends AnyRouter> = string & keyof TRouter["_def"]["queries"]
type TrpcQueries<TRouter extends AnyRouter> = TRouter["_def"]["queries"]
export type TrpcValue<TRouter extends AnyRouter> = TrpcQueries<TRouter>[TrpcPath<TRouter>]

export type TrpcInputs<TRouter extends AnyRouter> = inferHandlerInput<TrpcValue<TRouter>>

export const useTrpcSWRQuery = <
  TRouter extends AnyRouter,
  TPath extends TrpcPath<TRouter>,
>(trpcClient: TRPCClient<TRouter>, path: TPath, ...inputs: TrpcInputs<TRouter>) => {
  return useSWR([path, inputs], () => {
    const r = trpcClient.query(path, ...[...inputs])
    return r
  })
}
