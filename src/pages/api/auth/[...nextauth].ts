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
      authorization: "https://github.com/login/oauth/authorize?scope=read:user+user:email+repo",
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
      console.log({ session, user, token })
      session.accessToken = token.accessToken
      return {
        ...session,
        // token,
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt", { token, user, account, profile, isNewUser })
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