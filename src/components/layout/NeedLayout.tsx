import { Box, Center, Spinner } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, PropsWithChildren } from "react"
import { LoginPage } from "./Login"

export const NeedLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { status } = useSession()
  if (status === "loading") {
    return <Center h="100vh">
      <Spinner />
    </Center>
  }
  if (status === "unauthenticated") {
    return <Center h="100vh">
      <LoginPage />
    </Center>
  }
  return <>{children}</>
}