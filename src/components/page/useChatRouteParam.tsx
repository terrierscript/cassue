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
  const result = IssuesTargetTypeValue.safeParse({ type, value })
  if (result.success) {
    return result.data
  }
  return { type: "issues", value: "open" }
  // return { type, value }
}