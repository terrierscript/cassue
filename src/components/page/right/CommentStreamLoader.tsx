import { FC } from "react"
import { useIssueComments } from "../apiHooks"
import { CommentStream } from "../main/Stream"
import { useChatRouteParam, useCommentNumber } from "../useChatRouteParam"
import { Loading, StreamContainer } from "../main/ChatStream"


const CommentStreamInner: FC<{ number: number }> = ({ number }) => {
  const { owner, repo } = useChatRouteParam()

  const { data } = useIssueComments({ owner, repo, number })
  console.log(data)
  if (!data) {
    return <Loading />
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