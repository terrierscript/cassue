import { FC, useMemo } from "react"
import { useIssuesInfinate } from "../../page/apiHooks"
import { IssueStream } from "./IssueStream"
import { useChatRouteParam, useFilterValue } from "../../page/useChatRouteParam"
import { StreamLoading } from "./StreamLoading"
import { StreamStack } from "./StreamContainer"
import { Box, Slide, SlideFade } from "@chakra-ui/react"


const LoadingOverlay: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return <Box position={"relative"} opacity="0.5" bg="white">
    <SlideFade in={isLoading}>
      <Box position={"absolute"} bottom={0} left={2} >
        Loading ...
      </Box>

    </SlideFade>
  </Box>
}

export const IssueStreamLoader: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()
  const { target, value } = useFilterValue()
  const { data, setSize, size, isValidating, isLoading } = useIssuesInfinate({ owner, repo, target, value })
  const issues = useMemo(() => {
    return data?.map(data => data.issues).flat(1) ?? []
  }, [data])

  const loadPaginate = () => {
    setSize(size + 1)
  }

  if (!data) {
    return <StreamLoading />
  }
  return <StreamStack key={`${owner}_${repo}_${target}_${value}`}>
    <LoadingOverlay isLoading={isValidating} />
    <IssueStream issues={issues}
      isLoading={isValidating}
      onLoadMore={() => {
        loadPaginate()
      }} />
  </StreamStack>

}

export default IssueStreamLoader