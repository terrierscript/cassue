import { FC } from "react"
import { useIssuesInfinate } from "../../page/apiHooks"
import { IssueStream } from "./Stream"
import { useChatRouteParam, useFilterValue } from "../../page/useChatRouteParam"
import { StreamContainer } from "./StreamContainer"
import { StreamLoading } from "./StreamLoading"


export const IssueStreamLoader: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()
  const { target, value } = useFilterValue()
  const { data, size, setSize } = useIssuesInfinate({ owner, repo, target, value })
  if (!data) {
    return <StreamLoading />
  }
  return <StreamContainer key={`${owner}_${repo}_${target}_${value}`} >
    <IssueStream issues={data.issues} />
  </StreamContainer>
}

export default IssueStreamLoader