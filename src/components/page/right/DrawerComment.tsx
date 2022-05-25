import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, Grid, useDisclosure } from "@chakra-ui/react"
import { useEffect } from "react"
import CommentStreamLoader from "../../chat/CommentStreamLoader"
import { useCommentNumber, useRouterValues } from "../useChatRouteParam"

import { useBreakpointValue } from '@chakra-ui/react'
import IssueChatInputArea from "../../chat/input/IssueChatInput"
import { useRouter } from "next/router"

const DrawerInner = () => {
  return <Grid minH={0}
    w="100%"
    bg="gray.100"
    gridTemplateRows={"1fr auto max-content"}
    h="100%">
    <Box></Box>
    <CommentStreamLoader />
    <IssueChatInputArea />
  </Grid>
}

const useParentPath = () => {
  const { owner, repo, target, value } = useRouterValues()
  return `/${owner}/${repo}/${target}/${value}`
}
export const RightCommentDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const number = useCommentNumber()
  const router = useRouter()
  const parentPath = useParentPath()
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
    onClose={() => {
      router.push(parentPath)
    }}
    size={drawerSize}
  // size={{ base: "full", md: "sm" }}
  // finalFocusRef={btnRef}
  >
    <DrawerContent >
      <DrawerCloseButton />
      <DrawerBody p={0}>
        <DrawerInner />
      </DrawerBody>
    </DrawerContent>
  </Drawer >
}
