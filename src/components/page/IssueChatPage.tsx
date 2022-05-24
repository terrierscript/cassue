import { Box, Grid } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { IssuesTargetQuery } from "../../services/github/Schema"
import { useChatRouteParam, useCommentNumber } from "./useChatRouteParam"
// import { ChatInputArea } from "./main/ChatInput"
// import { LeftSidebar } from "./left/LeftSidebar"
// import { ChatHeader } from "./main/header/ChatHeader"
// import { ChatStream } from "./main/ChatStream"
import dynamic from "next/dynamic"


const LeftSidebar = dynamic(async () => {
  const { LeftSidebar } = await import("./left/LeftSidebar")
  return LeftSidebar
})
const ChatStream = dynamic(async () => {
  const { ChatStream } = await import("./main/ChatStream")
  return ChatStream
})
const ChatInputArea = dynamic(async () => {
  const { ChatInputArea } = await import("./main/ChatInput")
  return ChatInputArea
})
const ChatHeader = dynamic(import("./main/header/ChatHeader"))

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
            display: { base: "none", bp: "block" }
          },
          right: {
            w: 350,
            display: "block"
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

export const IssueChatPage: FC<{}> = () => {
  const params = useChatRouteParam()
  const layout = useLayoutStyle(params)
  console.log(layout)
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
      <Grid
        {...layout.center}
        minH={0}
        gridTemplateRows={"1fr auto max-content"}
        h="100%"
      >
        <ChatHeader />
        <ChatStream />
        <Box
          _light={{ bg: "blackAlpha.50" }}
          _dark={{ bg: "whiteAlpha.50" }}
          p={2}>
          <ChatInputArea />
        </Box>
      </Grid>
      <Box {...layout.right}>
        xx
      </Box>
    </Grid>
  </Box>
}

export default IssueChatPage