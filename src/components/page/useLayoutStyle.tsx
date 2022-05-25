import { useMemo } from "react"
import { IssuesTargetQuery } from "../../services/github/Schema"
import { useChatRouteParam, useCommentNumber } from "./useChatRouteParam"

type LayoutMode = "comment" | "issue" | "room"
const useLayoutMode = () => {
  const params = useChatRouteParam()
  const number = useCommentNumber()
  if (number) {
    return "comment"
  }
  if (params.filter && params.filter?.length > 1) {
    return "issue"
  }
  return "room"
}
const getLeftLayout = (mode: LayoutMode) => {
  const sideBarWidth = 240
  switch (mode) {
    case "room":
      return {
        w: { base: "100%", bp: sideBarWidth }
      }
    case "issue":
    case "comment":
      return {
        w: sideBarWidth, display: { base: "none", bp: "block" }
      }
  }
}
const getCenterLayout = (mode: LayoutMode) => {
  switch (mode) {
    case "room":
    case "comment":
      return { display: { base: "none", bp: "grid" } }
    case "issue":
      return { display: "grid" }
  }
}

const getRightLayout = (mode: LayoutMode) => {
  switch (mode) {
    case "issue":
    case "room":
      return { display: "none" }
    case "comment":
      return {
        w: {
          base: "100%",
          bp: 350
        },
        display: "grid"
      }
  }
}

export const useLayoutStyle = (params: IssuesTargetQuery) => {
  // const sideBarWidth = 240

  const mode = useLayoutMode()
  const layout = useMemo(() => {
    return {
      left: getLeftLayout(mode),
      center: getCenterLayout(mode),
      right: getRightLayout(mode),
    }
  }, [params])
  return layout
}
