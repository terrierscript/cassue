import { Flex, Stack } from "@chakra-ui/react"
import { FC, PropsWithChildren, useEffect, useRef } from "react"

export const StreamStack: FC<PropsWithChildren<{}>> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const behavior = scrollRef.current?.scrollTop === 0 ? "auto" : "smooth"
    // console.log({
    //   "sss": scrollRef.current?.scrollHeight,
    //   st: scrollRef.current?.scrollTop
    // })
    scrollRef.current?.scroll({
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
  >
    {children}
  </Stack>
}


