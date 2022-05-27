import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, Grid, useDisclosure } from "@chakra-ui/react"
import { useEffect } from "react"
import CommentStreamLoader from "../../chat/loader/CommentStreamLoader"
import { useCommentNumber, useRouterValues } from "../useChatRouteParam"

import { useBreakpointValue } from '@chakra-ui/react'
import IssueChatInputArea from "../../chat/input/IssueChatInput"
import { useRouter } from "next/router"
import CommentChatInputArea from "../../chat/input/CommentChatInput"
import { useAlpha } from "../../atomic/styleUtils"
import { CommentHeader } from "./CommentHeader"

const DrawerInner = () => {
  const bg = useAlpha(100)
  return <Grid
    w="100%"
    bg={bg}
    minH={0}
    gridTemplateRows={"max-content auto max-content"}
    // HACK:
    css={` height: 100vh; height: 100dvh;`}
  // h={[["100dvh", "100vh"]]}
  >
    <Box>
      <CommentHeader/>
    </Box>
    <Box overflow={"scroll"}>
      <CommentStreamLoader />
    </Box>
    <CommentChatInputArea />
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
