import { getSession, GetSessionParams } from "next-auth/react"

export const getSessionAccount = async (req: GetSessionParams): Promise<any | null> => {
  const session = await getSession(req)
  // @ts-ignore
  return session?.account ?? null
}