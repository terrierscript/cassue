import { FC } from "react"
import { useIssueComments } from "../apiHooks"
import { CommentStream } from "../main/Stream"
import { useChatRouteParam, useCommentNumber } from "../useChatRouteParam"
import { StreamContainer } from "../main/StreamContainer"
import { StreamLoading } from "../main/StreamLoading"


const CommentStreamInner: FC<{ number: number }> = ({ number }) => {
  const { owner, repo } = useChatRouteParam()
  const { data } = useIssueComments({ owner, repo, number })
  if (!data) {
    return <StreamLoading />
  }
  return <StreamContainer>
    <CommentStream comments={data.comments} />
  </StreamContainer>
}

export const CommentStreamLoader: FC<{}> = ({ }) => {
  const number = useCommentNumber()

  if (!number) {
    return null
  }
  return <CommentStreamInner number={number} />
}


export default CommentStreamLoader