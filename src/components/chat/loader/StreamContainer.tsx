import { Stack, StackProps } from "@chakra-ui/react"
import { FC, useEffect, useRef } from "react"

export const StreamStack: FC<StackProps> = (props) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const behavior = scrollRef.current?.scrollTop === 0 ? "auto" : "smooth"
    // const behavior = "smooth"
    console.log({
      "sss": scrollRef.current?.scrollHeight,
      st: scrollRef.current?.scrollTop
    })
    scrollRef.current?.scrollTo({
      behavior: behavior,
      top: scrollRef.current?.scrollHeight
    })
  }, [scrollRef.current?.scrollHeight])
  return <Stack
    overflow="scroll"
    w="100%"
    h="100%"
    ref={scrollRef}
    flexDirection="column-reverse"
    {...props}
  />
}


