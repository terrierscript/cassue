import { Box, Button } from "@chakra-ui/react"
import { signIn, signOut, useSession } from "next-auth/react"


export const LoginButton = () => {
  const { data: session } = useSession()
  if (!session?.user) {
    return <Button onClick={() => signIn()}>
      Sign in
    </Button>
  }
  console.log(session.user)
  return <Box>
    <Box>
      {session.user.name}
      {session.user.image}
    </Box>
    <Button onClick={() => signOut()}>
      Sign Out
    </Button>
  </Box>
}