import { Box, Grid } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { IssuesTargetQuery } from "../../services/github/Schema"
import { useChatRouteParam, useCommentNumber } from "./useChatRouteParam"
// import { ChatInputArea } from "./main/ChatInput"
// import { LeftSidebar } from "./left/LeftSidebar"
// import { ChatHeader } from "./main/header/ChatHeader"
// import { ChatStream } from "./main/ChatStream"
import dynamic from "next/dynamic"
import { alphaBgStyle } from "../atomic/styleUtils"
// import CommentStreamLoader  from "./right/CommentStreamLoader"
// import IssueStreamLoader from "./main/IssueStreamLoader"


const LeftSidebar = dynamic(import("./left/LeftSidebar"))
const ChatInputArea = dynamic(import("./main/ChatInput"))
const IssueStreamLoader = dynamic(import("./main/IssueStreamLoader"))
const ChatHeader = dynamic(import("./main/header/ChatHeader"))
const CommentStreamLoader = dynamic(import("./right/CommentStreamLoader"))

const useLayoutMode = () => {
  const params = useChatRouteParam()
  const number = useCommentNumber()
  if (number) {
    return "comment"
  }
  if (params.filter && params.filter?.length > 1) {
    return "issue"
  }
  return "room"
}

const useLayoutStyle = (params: IssuesTargetQuery) => {
  const sideBarWidth = 240
  const mode = useLayoutMode()
  const layout = useMemo(() => {
    switch (mode) {
      case "issue":
        return {
          left: {
            w: sideBarWidth, display: { base: "none", bp: "block" }
          },
          center: {},
          right: { display: "none" }
        }
      case "comment":
        return {
          left: {
            w: sideBarWidth, display: { base: "none", bp: "block" }
          },
          center: {
            display: { base: "none", bp: "grid" }
          },
          right: {
            w: 350,
            display: "grid"
          }
        }
      case "room":
        return {
          left: {
            w: { base: "100%", bp: sideBarWidth }
          },
          center: {
            display: { base: "none", bp: "grid" }
          },
          right: { display: "none" }
        }
    }
  }, [params])
  return layout
}


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
      <Box {...layout.left}>
        <LeftSidebar />
      </Box>
      <Box  {...layout.center}>
        <Grid
          minH={0}
          gridTemplateRows={"1fr auto max-content"}
          h="100%"
        >
          <ChatHeader />
          <IssueStreamLoader />
          <ChatInputArea />
        </Grid>
      </Box>
      <Box  {...layout.right}>
        <Grid minH={0}
          gridTemplateRows={"auto max-content"}
          h="100%"
          {...alphaBgStyle(100)}
        >
          <CommentStreamLoader />
          {/* <ChatInputArea /> */}
        </Grid>
      </Box>
    </Grid>
  </Box>
}

export default ChatPage