import { Box, Button, Divider, HStack, Link, Stack } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { RepositoryQuery } from "../../../services/github/Schema"
import { NextLink } from "../../../services/next/components"
import { useLabels } from "../apiHooks"
import { useChatRouteParam, useRouterValues } from "../useChatRouteParam"
import { CreateLabel } from "./CreateLabel"

type Room = {
  name: string,
  color?: string,
  // query?: string
  target: string,
  value: string
}

const RoomButton: FC<{ room: Room }> = ({ room }) => {
  const { owner, repo, target, value } = useRouterValues()
  const isActiveTarget = useMemo(() => {
    return target === room.target && value === room.value
  }, [room, target, value])
  const query = `${room.target}/${room.value}` // room?.query ?? room.name
  return <NextLink href={`/issues/${owner}/${repo}/${query}`} passHref>
    <Button variant={isActiveTarget ? "solid" : "ghost"}
      w="100%" justifyContent={"start"}
      size="sm" colorScheme={isActiveTarget ? "blackAlpha" : "gray"}
      as="a" >
      <HStack>
        <Box rounded="sm" w={"1em"} h="1em" bg={`#${room?.color}`}></Box>
        <Box>
          {room.name}
        </Box>
      </HStack>
    </Button>
  </NextLink>
}


export const Rooms: FC<{}> = ({ }) => {
  const { owner, repo } = useRouterValues()
  const { data } = useLabels({ owner, repo })
  const rooms: Room[] = [
    {
      name: "issues",
      // query: "issues/all",
      target: "issues",
      value: "all"
    },
    ...(data?.labels ?? []).map(label => {
      return {
        name: label.name,
        color: label.color,
        target: "labels",
        value: label.name,
        // query: `labels/${label.name}`
      }
    })
  ]
  return <Stack  >
    {rooms.map(room => {
      return <Box key={room.name} >
        <RoomButton room={room} />
      </Box>
    })}
    <Divider />
    <CreateLabel />
  </Stack >
}