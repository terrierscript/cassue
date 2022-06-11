import { FC } from "react"
import { useIssueComments } from "../../page/apiHooks"
import { useChatRouteParam, useCommentNumber } from "../../page/useChatRouteParam"
import { CommentStream } from "./Stream"
import { StreamStack } from "./StreamContainer"
import { StreamLoading } from "./StreamLoading"


const CommentStreamInner: FC<{ number: number }> = ({ number }) => {
  const { owner, repo } = useChatRouteParam()
  const { data } = useIssueComments({ owner, repo, number })
  if (!data) {
    return <StreamLoading />
  }
  return <CommentStream comments={data.comments} />
}

export const CommentStreamLoader: FC<{}> = ({ }) => {
  const number = useCommentNumber()

  if (!number) {
    return null
  }
  return <CommentStreamInner number={number} />
}


export default CommentStreamLoader