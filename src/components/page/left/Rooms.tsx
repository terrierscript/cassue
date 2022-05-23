import { Box, Button, Divider, Link, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { RepositoryQuery } from "../../../services/github/Schema"
import { NextLink } from "../../../services/next/components"
import { useLabels } from "../apiHooks"
import { useChatRouteParam } from "../useChatRouteParam"
import { CreateLabel } from "./CreateLabel"

type Room = {
  name: string,
  query?: string
}

export const Rooms: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()

  const { data } = useLabels({ owner, repo })
  const rooms: Room[] = [
    { name: "all", query: "issues/all" },
    ...(data?.labels ?? []).map(label => {
      return {
        name: label.name,
        query: `labels/${label.name}`
      }
    })
  ]
  return <Stack  >
    <Stack spacing={0}>

      <Box fontWeight={"bold"}>
        {owner}
      </Box>
      <Box fontWeight={"bold"}>
        {repo}
      </Box>
    </Stack>
    <Divider />
    {rooms.map(room => {
      const query = room?.query ?? room.name
      return <Box key={room.name} >
        <NextLink href={`/${owner}/${repo}/${query}`} passHref>
          <Button variant={"ghost"} w="100%" justifyContent={"start"}
            size="sm" colorScheme={"gray"} as="a" >
            # {room.name}
          </Button>
        </NextLink>
      </Box>
    })}
    <Divider />
    {/* <CreateLabel  {...{ owner, repo }} /> */}
  </Stack >
}