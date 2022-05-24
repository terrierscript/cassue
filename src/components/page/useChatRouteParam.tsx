import { IssuesTargetQueryScheme, IssuesTargetTypeValueScheme, zStringNumber } from "../../services/github/Schema"
import { useRouter } from "next/router"
import { z } from "zod"


export const useChatRouteParam = () => {
  const router = useRouter()
  const param = IssuesTargetQueryScheme.parse(router.query)
  return param

}

export const useCommentNumber = (): number | null => {


  const { filter } = useChatRouteParam()
  const [_target, _value, number] = filter ?? []
  const parseResult = zStringNumber.safeParse(number)

  if (parseResult.success) {
    return parseResult.data
  }
  return null
}
export const useFilterValue = (): z.infer<typeof IssuesTargetTypeValueScheme> => {
  const { filter } = useChatRouteParam()
  const [target, value] = filter ?? []
  const result = IssuesTargetTypeValueScheme.safeParse({ target, value })
  if (result.success) {
    return result.data
  }
  return { target: "issues", value: "open" }
  // return { type, value }
}