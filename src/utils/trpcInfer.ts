import { TRPCClient, TRPCRequestOptions } from "@trpc/client"
import { AnyRouter, inferHandlerInput, inferProcedureOutput } from "@trpc/server"
import useSWR from "swr"
import useSWRInfinite from "swr/infinite"


export type TrpcPath<TRouter extends AnyRouter> = string & keyof TRouter["_def"]["queries"]
type TrpcQueries<TRouter extends AnyRouter> = TRouter["_def"]["queries"]
export type TrpcValue<TRouter extends AnyRouter> = TrpcQueries<TRouter>[TrpcPath<TRouter>]

export type TrpcInputs<TRouter extends AnyRouter> = inferHandlerInput<TrpcValue<TRouter>>

export type TrpcOutput<TRouter extends AnyRouter, TPath extends TrpcPath<TRouter>> = inferProcedureOutput<TrpcQueries<TRouter>[TPath]>
// inferProcedureOutput<TQueries[TPath]>

// export type TrpcInput<TRouter extends AnyRouter> = inferHandlerInput<TrpcValue<TRouter>>[0]
// export type TrpcQueryParam<TRouter extends AnyRouter> = [TrpcInput<TrpcValue<TRouter>>, TRPCRequestOptions?]

export const useTrpcSWRQuery = <TRouter extends AnyRouter, TPath extends TrpcPath<TRouter>>(trpcClient: TRPCClient<TRouter>, path: TPath, ...inputs: TrpcInputs<TRouter>) => {
  type T = inferProcedureOutput<TrpcQueries<TRouter>[TPath]>
  return useSWR<T>([path, inputs], () => {
    return trpcClient.query(path, ...[...inputs])
  })
}
