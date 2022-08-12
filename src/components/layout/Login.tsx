import { Box, Button, Center, useColorModeValue } from "@chakra-ui/react"
import { MarkGithubIcon } from "@primer/octicons-react"
import { signIn, signOut, useSession } from "next-auth/react"


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