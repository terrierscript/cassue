import { Flex } from "@chakra-ui/react"
import { FC, PropsWithChildren, useEffect, useRef } from "react"

export const StreamContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scroll({
      behavior: "smooth",
      top: scrollRef.current?.scrollHeight
    })
  }, [scrollRef.current?.scrollHeight])
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


