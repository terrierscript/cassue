import { getSession } from "next-auth/react"

export const getSessionAccount = async (req): Promise<string | null> => {
  const session = await getSession(req)
  // @ts-ignore
  return session?.account ?? null
}