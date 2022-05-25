import { Avatar, Box, Button, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Spacer } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, PropsWithChildren } from "react"
import { signOut } from "next-auth/react"

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
          <Button variant="link" colorScheme="red" onClick={() => {
            signOut()
          }}>Logout</Button>
        </PopoverBody>
        {/* <PopoverFooter>This is the footer</PopoverFooter> */}
      </PopoverContent>
    </Portal>
  </Popover>
}

export const UserIcon = () => {
  const session = useSession()
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
