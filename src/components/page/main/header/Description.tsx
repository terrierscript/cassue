import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { useLabel } from "../../apiHooks"
import { useChatRouteParam } from "../../useChatRouteParam"

const LabelDescription: FC<any> = ({ owner, repo, label }) => {
  const { data } = useLabel({ owner, repo }, label)
  return <Box>{data.label?.description}</Box>
}
export const Description: FC<{}> = ({ }) => {
  const { owner, repo, filter } = useChatRouteParam()

  const [type, value] = filter ?? []
  if (type === "labels") {
    return <LabelDescription {...{ owner, repo, label: value }} />
  }
  return null
}
