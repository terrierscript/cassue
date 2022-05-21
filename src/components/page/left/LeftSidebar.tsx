import { Avatar, Box, Divider, HStack, IconButton, Spacer, Stack, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC } from "react"
import { IssueParam } from "../../../services/github/Schema"
import { Rooms } from "./Rooms"
import { LightBulbIcon } from '@heroicons/react/outline'

const ThemeSwitcher = () => {
  const { toggleColorMode } = useColorMode()
  return <Box>
    <IconButton p={2} onClick={() => toggleColorMode()} aria-label={""} icon={<LightBulbIcon />} />
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

export const LeftSidebar: FC<IssueParam> = (props) => {
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