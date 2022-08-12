import { Box, Center, HStack, Spinner } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, PropsWithChildren } from "react"
import { CenterSpinner } from "./CenterSpinner"
import { LoginPage } from "./Login"

export const NeedLogin: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { status } = useSession()
  if (status === "loading") {
    return <CenterSpinner>
      Session Loading
    </CenterSpinner>
  }
  if (status === "unauthenticated") {
    return <Center h="100vh">
      <LoginPage />
    </Center>
  }
  return <>{children}</>
}