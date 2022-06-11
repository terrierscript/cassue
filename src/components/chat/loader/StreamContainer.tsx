import { Stack, StackProps } from "@chakra-ui/react"
import { Children, FC, useEffect, useRef } from "react"

export const StreamStack: FC<StackProps> = (props, targetKey) => {
  const childNum = Children.count(props.children)
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const behavior = scrollRef.current?.scrollTop === 0 ? "auto" : "smooth"
    // const behavior = "smooth"
    scrollRef.current?.scrollTo({
      behavior: behavior,
      top: scrollRef.current?.scrollHeight
    })
  }, [
    childNum
    // scrollRef.current?.scrollHeight
  ])
  return <Stack
    overflow="scroll"
    w="100%"
    h="100%"
    ref={scrollRef}
    flexDirection="column-reverse"
    {...props}
  />
}


