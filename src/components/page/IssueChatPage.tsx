import { Box, Center, Flex, Grid, Spinner } from "@chakra-ui/react"
import { FC, PropsWithChildren, useMemo } from "react"
import { ChatInputArea } from "./main/ChatInput"
import { useIssues } from "./apiHooks"
import { LeftSidebar } from "./left/LeftSidebar"
import { IssuesTargetQuery } from "../../services/github/Schema"
import { ChatHeader } from "./main/ChatHeader"
import { IssueStream } from "./main/IssueStream"


const IssueStreamWrap: FC<IssuesTargetQuery> = ({ owner, repo, filter }) => {
  const { data } = useIssues({ owner, repo, filter })
  if (!data) {
    return <Flex h="100%" w="100%" overflow={"scroll"}>
      <Center h="50vh" w="100%" overflow={"scroll"} >
        <Spinner />
      </Center>
    </Flex>
  }
  return <Flex
    overflow="scroll"
    w="100%"
    h="100%"
    flexDirection="column-reverse"
  >
    <IssueStream issues={data.issues} />
  </Flex >
}

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

export const IssueChatPage: FC<IssuesTargetQuery> = (params) => {
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
        <LeftSidebar {...params} />
      </Box>
      <Grid
        {...layout.center}
        minH={0}
        gridTemplateRows={"1fr auto max-content"}
        h="100%"
      >
        <ChatHeader {...params} />
        <IssueStreamWrap  {...params} />
        <Box
          _light={{ bg: "blackAlpha.50" }}
          _dark={{ bg: "whiteAlpha.50" }}
          p={2}>
          <ChatInputArea {...params} />
        </Box>
      </Grid>
    </Grid>
  </Box>
}
