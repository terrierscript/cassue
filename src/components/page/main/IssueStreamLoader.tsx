import { FC } from "react"
import { useIssues } from "../apiHooks"
import { IssueStream } from "./Stream"
import { useChatRouteParam } from "../useChatRouteParam"
import { StreamContainer } from "./StreamContainer"
import { StreamLoading } from "./StreamLoading"


export const IssueStreamLoader: FC<{}> = ({ }) => {
  const { owner, repo, filter } = useChatRouteParam()
  const { data } = useIssues({ owner, repo, filter })
  if (!data) {
    return <StreamLoading />
  }
  return <StreamContainer>
    <IssueStream issues={data.issues} />
  </StreamContainer>
}

export default IssueStreamLoader