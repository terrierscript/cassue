import { getSession } from "next-auth/react"

export const getAccessToken = async (req): Promise<string | null> => {
  const session = await getSession(req)
  // @ts-ignore
  return session?.accessToken ?? null
}