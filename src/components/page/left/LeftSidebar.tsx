import { Avatar, Box, Button, Divider, HStack, IconButton, Spacer, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC } from "react"
import { RepositoryQuery } from "../../../services/github/Schema"
import { Rooms } from "./Rooms"
// import { LightBulbIcon } from '@heroicons/react/outline'
import { BiBulb } from "react-icons/bi"

const ThemeSwitcher = () => {
  const { toggleColorMode } = useColorMode()
  return <Box>
    <IconButton onClick={() => toggleColorMode()} aria-label={"Change theme"} icon={<BiBulb />} />
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

const Debugger = () => {
  const cacheSize = JSON.parse(localStorage.getItem('app-cache') ?? "{}")
  return <Box color="gray.500">
    Cache:  {Object.keys(cacheSize).length}
  </Box>
}
export const LeftSidebar: FC<{}> = () => {

  const bg = useAlpha(200)
  const color = useAlpha(800)

  return <Stack h="100%" p={6}
    bg={bg}
    color={color}>
    <Rooms />
    <Spacer />
    <Divider />

    <Debugger />
    <HStack>
      <User />
      <ThemeSwitcher />
    </HStack>
  </Stack>
}