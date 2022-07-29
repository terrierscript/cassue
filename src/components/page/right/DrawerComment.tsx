import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, Flex, Grid, Spacer, useDisclosure } from "@chakra-ui/react"
import { useEffect } from "react"
import CommentStreamLoader from "../../chat/loader/CommentStreamLoader"
import { useCommentNumber, useRouterValues } from "../useChatRouteParam"

import { useBreakpointValue } from '@chakra-ui/react'
import IssueChatInputArea from "../../chat/input/IssueChatInput"
import { useRouter } from "next/router"
import CommentChatInputArea from "../../chat/input/CommentChatInput"
import { useAlpha } from "../../chakra/styleUtils"
import { CommentHeader } from "./CommentHeader"
import { StreamStack } from "../../chat/loader/StreamContainer"

const DrawerInner = () => {
  const bg = useAlpha(100)
  const number = useCommentNumber()
  if (!number) {
    return null
  }
  return <Grid
    w="100%"
    bg={bg}
    minH={0}
    gridTemplateRows={"max-content auto min-content"}
    // HACK:
    sx={{
      height: "100vh",
      "&": {
        height: "100dvh"
      }
    }}
  >
    <Box>
      <CommentHeader issueNumber={number} />
    </Box>
    <StreamStack
      minH={0}
      flexDirection="column"
    >
      <Spacer />
      <CommentStreamLoader />
    </StreamStack>
    <CommentChatInputArea />
  </Grid>
}

const useParentPath = () => {
  const { owner, repo, target, value } = useRouterValues()
  return `/issues/${owner}/${repo}/${target}/${value}`
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
