import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { useLabel } from "../../apiHooks"
import { useChatRouteParam } from "../../useChatRouteParam"

const LabelDescription: FC<{}> = ({ }) => {
  const { owner, repo, filter } = useChatRouteParam()
  const [type, value] = filter ?? []

  const { data } = useLabel({ owner, repo }, value)
  return <Box>{data.label?.description}</Box>
}
export const Description: FC<{}> = ({ }) => {
  const { owner, repo, filter } = useChatRouteParam()

  const [type, value] = filter ?? []
  if (type === "labels") {
    return <LabelDescription />
  }
  return null
}
