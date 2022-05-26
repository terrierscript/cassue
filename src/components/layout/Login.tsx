import { Box, Button, Center, useColorModeValue } from "@chakra-ui/react"
import { MarkGithubIcon } from "@primer/octicons-react"
import { signIn, signOut, useSession } from "next-auth/react"


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

export const LoginPage = () => {
  // const style = useColorModeValue({
  //   bg: "black", color: "white"
  // }, {
  //   bg: "black", color: "white"
  // })
  return <Center p={4} h="100vh">
    <Button
      size="lg"
      // colorScheme={"red"}
      // {...style}
      leftIcon={<MarkGithubIcon />}
      onClick={() => signIn("github")}>
      Sign in with GitHub
    </Button>
  </Center>

}