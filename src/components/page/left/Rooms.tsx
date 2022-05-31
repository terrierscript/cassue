import { Box, Button, Divider, HStack, Link, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { RepositoryQuery } from "../../../services/github/Schema"
import { NextLink } from "../../../services/next/components"
import { useLabels } from "../apiHooks"
import { useChatRouteParam } from "../useChatRouteParam"
import { CreateLabel } from "./CreateLabel"

type Room = {
  name: string,
  color: string,
  query?: string
}

const RoomButton: FC<{ room: Room }> = ({ room }) => {
  const { owner, repo } = useChatRouteParam()
  const query = room?.query ?? room.name
  return <NextLink href={`/${owner}/${repo}/${query}`} passHref>
    <Button variant={"ghost"} w="100%" justifyContent={"start"}
      size="sm" colorScheme={"gray"} as="a" >
      <HStack>
        <Box rounded="full" w={"1em"} h="1em" bg={`#${room?.color}`}></Box>
        <Box>
          {room.name}
        </Box>
      </HStack>
    </Button>
  </NextLink>
}


export const Rooms: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()

  const { data } = useLabels({ owner, repo })
  const rooms: Room[] = [
    { name: "all", color: "ffffff", query: "issues/all" },
    ...(data?.labels ?? []).map(label => {
      return {
        name: label.name,
        color: label.color,
        query: `labels/${label.name}`
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