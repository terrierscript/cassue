import { checkToken, refreshToken } from "@octokit/oauth-methods"

export async function refreshAccessTokenIfNeed(account) {
  // if (Date.now() < account.expires_at * 1000) {
  //   return account
  // }
  console.log(account)
  const refreshed = await refreshAccessToken(account.refresh_token)
  console.log({ refreshed })
  return account
}
export async function refreshAccessToken(token) {
  const result = await refreshToken({
    clientType: "oauth-app",
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    refreshToken: token
  })
  console.log({ result })
  // await refreshToken({

  // })
}