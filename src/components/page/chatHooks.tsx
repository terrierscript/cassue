import { useRouter } from "next/router"
import { IssuesTargetQueryScheme } from "../../services/github/Schema"


export const useChatPageParams = () => {
  const router = useRouter()
  const param = IssuesTargetQueryScheme.safeParse(router.query)
  if (param.success) {
    return param.data
  }
  return null
}