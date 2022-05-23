import { IssuesTargetQueryScheme, IssuesTargetTypeValue } from "../../services/github/Schema"
import { useRouter } from "next/router"

export const useChatRouteParam = () => {
  const router = useRouter()
  const param = IssuesTargetQueryScheme.parse(router.query)
  return param
}


export const useFilterValue = () => {
  const { filter } = useChatRouteParam()
  const [type, value] = filter ?? []
  return IssuesTargetTypeValue.parse({ type, value })
  // return { type, value }
}