import { getSession, GetSessionParams } from "next-auth/react"

export const getSessionAccount = async (sessionParam: GetSessionParams): Promise<string | null> => {
  const session = await getSession(sessionParam)
  // @ts-ignore
  return session?.account ?? null
}