
import { createTRPCClient } from '@trpc/react'
import type { AppRouter } from "../services/trpc/AppRouter"

export const useAppClient = () => {
  return createTRPCClient<AppRouter>({
    url: `/api/trpc/`
  })
}