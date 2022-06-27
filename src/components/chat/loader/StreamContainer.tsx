import { Stack, StackProps } from "@chakra-ui/react"
import { Children, createContext, FC, useContext, useEffect, useRef } from "react"

type IssueScroll = {
  scrollToBottom: () => void
} | null

const IssueScrollContext = createContext<IssueScroll>(null)
export const useScroll = () => {
  return useContext(IssueScrollContext)
}

export const StreamStack: FC<StackProps> = (props, targetKey) => {
  // const childNum = Children.count(props.children)
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    const behavior = scrollRef.current?.scrollTop === 0 ? "auto" : "smooth"
    // const behavior = "smooth"
    scrollRef.current?.scrollTo({
      behavior: behavior,
      top: scrollRef.current?.scrollHeight
    })
  }
  // useEffect(() => {
  //   const behavior = scrollRef.current?.scrollTop === 0 ? "auto" : "smooth"
  //   // const behavior = "smooth"
  //   scrollRef.current?.scrollTo({
  //     behavior: behavior,
  //     top: scrollRef.current?.scrollHeight
  //   })
  // }, [
  //   childNum
  //   // scrollRef.current?.scrollHeight
  // ])
  return <IssueScrollContext.Provider value={{ scrollToBottom }}>
    <Stack
      overflow="scroll"
      w="100%"
      h="100%"
      ref={scrollRef}
      flexDirection="column-reverse"
      {...props}
    />
  </IssueScrollContext.Provider>
}


