
import { createReactQueryHooks } from '@trpc/react'
import { AppRouter } from "../services/trpc/AppRouter"

export const trpc = createReactQueryHooks<AppRouter>()
export const useTrpcQuery = trpc.useQuery