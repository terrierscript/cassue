import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import GithubProvider from "next-auth/providers/github"
export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile: (profile, ...rest) => {
        console.log({ profile, rest })
        return {
          id: profile.id.toString(),
          // name: `${profile.name} (${profile.login})`,
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      return {
        ...session,
        token,
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log({ token, user, account, profile, isNewUser })
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      if (profile?.login) {
        token.login = profile.login
      }
      return token
    }
  },

})