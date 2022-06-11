import { Flex } from "@chakra-ui/react"
import { FC, PropsWithChildren, useEffect, useRef } from "react"

export const StreamContainer: FC<PropsWithChildren<{
  scrollTargetKey: string
}>> = ({ children, scrollTargetKey }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const behavior = scrollRef.current?.scrollTop === 0 ? "auto" : "smooth"
    scrollRef.current?.scroll({
      behavior: behavior,
      top: scrollRef.current?.scrollHeight
    })
  }, [scrollTargetKey]) // scrollRef.current?.scrollHeight])
  return <Flex
    overflow="scroll"
    w="100%"
    h="100%"
    ref={scrollRef}
    flexDirection="column"
  >
    {children}
  </Flex>
}


