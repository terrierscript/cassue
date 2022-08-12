import { Button, ButtonProps } from "@chakra-ui/react"
import { MarkGithubIcon } from "@primer/octicons-react"
import { signIn } from "next-auth/react"
import { FC } from "react"

// export const LoginButton = () => {
//   const { data: session } = useSession()
//   if (!session?.user) {
//     return <Button onClick={() => signIn("github")}>
//       Sign in
//     </Button>
//   }
//   console.log(session.user)
//   return <Box>
//     <Box>
//       {session.user.name}
//       {session.user.image}
//     </Box>
//     <Button onClick={() => signOut()}>
//       Sign Out
//     </Button>
//   </Box>
// }


export const GithubLoginButton: FC<ButtonProps> = ({ ...props }) => {
  return <Button
    // colorScheme={"red"}
    // {...style}
    leftIcon={<MarkGithubIcon />}
    onClick={() => signIn("github")}
    {...props} />
}
