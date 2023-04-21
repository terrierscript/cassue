import { Box, Grid } from "@chakra-ui/react"
import { FC } from "react"
import { useChatRouteParam } from "./useChatRouteParam"
import dynamic from "next/dynamic"
import { useLayoutStyle } from "./useLayoutStyle"
import { RightCommentDrawer } from "./right/DrawerComment"

const LeftSidebar = dynamic(import("./left/LeftSidebar"))
const ChatInputArea = dynamic(import("../chat/input/IssueChatInput"))
const IssueStreamLoader = dynamic(import("../chat/loader/IssueStreamLoader"))
const ChatHeader = dynamic(import("./main/header/ChatHeader"))

export const ChatPage: FC<{}> = () => {
  const params = useChatRouteParam()
  const layout = useLayoutStyle(params)

  return <Box
    position="absolute"
    top={0} left={0} right={0} bottom={0}
  >
    <Grid h="100%" gridTemplateColumns={{
      base: "auto",
      bp: "max-content 1fr max-content"
    }} >
      <Box {...layout.left}
        minH={0}
        h="100%">
        <LeftSidebar />
      </Box>
      <Grid
        {...layout.center}
        minH={0}
        h="100%"
        gridTemplateRows={"1fr auto max-content"}
      >
        <ChatHeader />
        <IssueStreamLoader />
        <ChatInputArea />
      </Grid>
    </Grid>
    <RightCommentDrawer />
  </Box>
}

export default ChatPage