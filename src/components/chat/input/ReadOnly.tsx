import { Button, HStack } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import { FC, PropsWithChildren, useMemo } from "react"
import { useIsRepoMaintainer } from "../../page/apiHooks"
import { useChatRouteParam } from "../../page/useChatRouteParam"

const ReadOnlyMode: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()
  return <HStack>
    <Button as="a"
      w="100%"
      colorScheme="gray"
      href={`https://github.com/${owner}/${repo}/issues/new`}>
      Open in Github
    </Button>
  </HStack>
}

export const ReadOnlyGuard: FC<PropsWithChildren<{}>> = ({ children }) => {

  const { owner, repo } = useChatRouteParam()
  const { data, error } = useIsRepoMaintainer({ owner, repo })
  // const { data } = useSession()
  // const disabled = useMemo(() => {
  //   return (data?.user?.name !== owner)
  // }, [data, owner])
  console.log(data, error)
  if (error || data.isMaintainer === false) {
    return <ReadOnlyMode />
  }
  return <>{children}</>
}
