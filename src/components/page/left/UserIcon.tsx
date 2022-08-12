import { Avatar, Box, Button, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Spacer, Stack } from "@chakra-ui/react"
import { signIn, useSession } from "next-auth/react"
import { FC, PropsWithChildren } from "react"
import { signOut } from "next-auth/react"
import { GithubLoginButton } from "../../layout/GithubLoginButton"

const UserMenu: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <Popover>
    <PopoverTrigger>
      {children}
    </PopoverTrigger>
    <Portal>
      <PopoverContent mx={2}>
        <PopoverArrow />
        {/* <PopoverHeader></PopoverHeader> */}
        <PopoverCloseButton />
        <PopoverBody>
          <Stack spacing={4}>

            <Button variant="link" as="a" href="/">
              Switch repository
            </Button>
            <Button variant="link" colorScheme="red" onClick={() => {
              signOut()
            }}>Logout</Button>
          </Stack>
        </PopoverBody>
        {/* <PopoverFooter>This is the footer</PopoverFooter> */}
      </PopoverContent>
    </Portal>
  </Popover>
}

export const UserIcon = () => {
  const session = useSession()
  if (!session.data) {
    return <Box>
      <GithubLoginButton>Login</GithubLoginButton>
    </Box>
  }
  return <Box>
    <HStack>
      <UserMenu>
        <Avatar size="sm" src={session.data?.user?.image ?? undefined} />
      </UserMenu>
      <Spacer />
      <Box>{session.data?.user?.name}</Box>
    </HStack>
  </Box>
}
