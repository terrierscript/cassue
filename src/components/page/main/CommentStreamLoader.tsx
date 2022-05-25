import { FC } from "react"
import { useIssueComments } from "../apiHooks"
import { CommentStream } from "./Stream"
import { useChatRouteParam } from "../useChatRouteParam"
import { Loading, StreamContainer } from "./ChatStream"

export const CommentStreamLoader: FC<{ number: number }> = ({ number }) => {
  const { owner, repo } = useChatRouteParam()

  const { data } = useIssueComments({ owner, repo, number })
  if (!data) {
    return <Loading />
  }
  return <StreamContainer>
    <CommentStream comments={data.comments} />
  </StreamContainer>
}
