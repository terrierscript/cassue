import { getSession } from "next-auth/react"

export const getAccessToken = async (req) => {
  const session = await getSession(req)

}