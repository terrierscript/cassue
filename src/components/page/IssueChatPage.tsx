import { Box, Grid } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { ChatInputArea } from "./main/ChatInput"
import { LeftSidebar } from "./left/LeftSidebar"
import { IssuesTargetQuery } from "../../services/github/Schema"
import { ChatHeader } from "./main/header/ChatHeader"
import { useChatRouteParam } from "./useChatRouteParam"
import { ChatStream } from "./main/ChatStream"

const useLayoutStyle = (params: IssuesTargetQuery) => {
  const sideBarWidth = 240
  const layout = useMemo(() => {
    if (params.filter && params.filter?.length > 1) {
      return {
        left: {
          w: sideBarWidth, display: { base: "none", bp: "block" }
        },
        center: {}
      }
    }
    return {
      left: {
        w: { base: "100%", bp: sideBarWidth }
      },
      center: {
        display: { base: "none", bp: "grid" }
      }
    }
  }, [params])
  return layout
}

export const IssueChatPage: FC<{}> = () => {
  const params = useChatRouteParam()
  const layout = useLayoutStyle(params)
  return <Box
    position="absolute"
    top={0} left={0} right={0} bottom={0}
  >
    <Grid h="100%" gridTemplateColumns={{
      base: "auto",
      bp: "max-content 1fr"
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
    </Grid>
  </Box>
}
