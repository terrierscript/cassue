import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import GithubProvider from "next-auth/providers/github"
import { refreshAccessToken, refreshAccessTokenIfNeed } from "../../../services/github/refreshToken"
export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile: (profile, ...rest) => {
        // console.log({ profile, rest })
        return {
          id: profile.id.toString(),
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // console.log({ session, user, token })
      // console.log(new Date(token.exp * 1000))
      // await refreshAccessToken(token.accessToken)

      // @ts-ignore
      session.account = token.account
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.account = account
      }

      // await refreshAccessTokenIfNeed(token.account)

      if (profile?.login) {
        token.login = profile.login
      }
      return token
    }
  },

})