import { FC, useMemo } from "react"
import { useIssuesInfinate } from "../../page/apiHooks"
import { IssueStream } from "./Stream"
import { useChatRouteParam, useFilterValue } from "../../page/useChatRouteParam"
import { StreamContainer } from "./StreamContainer"
import { StreamLoading } from "./StreamLoading"
import { Box } from "@chakra-ui/react"


export const IssueStreamLoader: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()
  const { target, value } = useFilterValue()
  const { data, setSize, size } = useIssuesInfinate({ owner, repo, target, value })
  const issues = useMemo(() => {
    return data?.map(data => data.issues).flat(1) ?? []
  }, [data])
  const loadPaginate = () => {
    setSize(size + 1)
  }


  if (!data) {
    return <StreamLoading />
  }
  return <Box>
    <Box onClick={() => [
      loadPaginate()
    ]}>more</Box>
    <StreamContainer key={`${owner}_${repo}_${target}_${value}`}
      scrollTargetKey={issues[0].number.toString() ?? ""}
    >
      <IssueStream issues={issues} />
    </StreamContainer>
  </Box>
}

export default IssueStreamLoader