import { getSession, GetSessionParams } from "next-auth/react"

export type GithubAccount = {
  provider: string
  type: string
  providerAccountId: string
  access_token: string
  token_type: string
  scope: string
}
export const getSessionAccount = async (req: GetSessionParams): Promise<GithubAccount> => {
  const session = await getSession(req)
  if (!session?.account) {
    // TODO...
    throw new Error("Invalid login")
  }
  // @ts-ignore
  return session?.account ?? null
}