import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, Grid, useDisclosure } from "@chakra-ui/react"
import { useEffect } from "react"
import CommentStreamLoader from "./CommentStreamLoader"
import { useCommentNumber } from "../useChatRouteParam"

import { useBreakpointValue } from '@chakra-ui/react'
import ChatInputArea from "../main/ChatInput"

const DrawerInner = () => {
  return <Grid minH={0}
    w="100%"
    bg="gray.100"
    gridTemplateRows={"1fr auto max-content"}
    h="100%">
    <Box></Box>
    <CommentStreamLoader />
    <ChatInputArea />
  </Grid>
}
export const RightCommentDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const number = useCommentNumber()
  useEffect(() => {
    if (!number) {
      onClose()
    } else {
      onOpen()
    }
  }, [number])
  const drawerSize = useBreakpointValue({
    base: "full",
    bp: "sm"
  })

  return <Drawer isOpen={isOpen}
    placement='right'
    onClose={onClose}
    size={drawerSize}
  // size={{ base: "full", md: "sm" }}
  // finalFocusRef={btnRef}
  >
    <DrawerContent >
      <DrawerBody p={0}>
        <DrawerInner />
      </DrawerBody>
    </DrawerContent>
  </Drawer >
}
