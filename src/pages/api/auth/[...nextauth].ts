import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile: (profile) => {
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

})