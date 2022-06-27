import { createContext, FC, useMemo } from "react"
import { useIssuesInfinate } from "../../page/apiHooks"
import { IssueStream } from "./Stream"
import { useChatRouteParam, useFilterValue } from "../../page/useChatRouteParam"
// import { StreamStack } from "./StreamContainer"
import { StreamLoading } from "./StreamLoading"
import { Box } from "@chakra-ui/react"
import { StreamStack } from "./StreamContainer"



export const IssueStreamLoader: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()
  const { target, value } = useFilterValue()
  const { data, setSize, size, isValidating } = useIssuesInfinate({ owner, repo, target, value })
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
    <IssueStream issues={issues}
      isLoading={isValidating}
      onLoadMore={() => {
        loadPaginate()
      }} />
  </StreamStack>

}

export default IssueStreamLoader