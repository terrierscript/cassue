import { IssuesTargetQueryScheme } from "../../services/github/Schema"
import { useRouter } from "next/router"

const useChatRouteParam = () => {
  const router = useRouter()
  const param = IssuesTargetQueryScheme.parse(router.query)
  return param
}
