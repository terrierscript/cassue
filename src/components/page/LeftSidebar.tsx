import { Avatar, Box, Button, Divider, HStack, Spacer, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, useEffect } from "react"
import { IssuePageProps } from "./Props"
import { Rooms } from "./Rooms"

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode()
  return <Box>
    <Button onClick={() => toggleColorMode()}>{colorMode}</Button>
  </Box>
}

const User = () => {
  const session = useSession()
  return <Box>
    <HStack>
      <Avatar size="sm" src={session.data?.user?.image ?? undefined} />
      <Box>{session.data?.user?.name}</Box>
    </HStack>
  </Box>
}

const useAlpha = (value: number) => {
  return useColorModeValue(`blackAlpha.${value}`, `whiteAlpha.${value}`)
}
const useAlpha2 = (value: number) => {
  return useColorModeValue(`whiteAlpha.${value}`, `blackAlpha.${value}`)
}

export const LeftSidebar: FC<IssuePageProps> = (props) => {
  const bg = useAlpha(200)
  const color = useAlpha(800)

  return <Stack h="100%" p={6} w={240}
    bg={bg}
    color={color}>
    <Rooms {...props} />
    <Spacer />
    <Divider />
    <HStack>
      <User />
      <ThemeSwitcher />
    </HStack>
  </Stack>
}