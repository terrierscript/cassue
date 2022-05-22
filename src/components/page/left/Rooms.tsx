import { Box, Button, Divider, Link, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { RepositoryQuery } from "../../../services/github/Schema"
import { useLabels } from "../apiHooks"
import { CreateLabel } from "./CreateLabel"

type Room = {
  name: string,
  query?: string
}
export const Rooms: FC<RepositoryQuery> = ({ owner, repo }) => {
  const { data } = useLabels({ owner, repo })
  const rooms: Room[] = [
    { name: "all", query: "" },
    ...(data?.labels ?? []).map(label => {
      return {
        name: label.name,
        query: `label/${label.name}`
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
        <Button variant={"ghost"} w="100%" justifyContent={"start"}
          size="sm" colorScheme={"gray"} as="a" href={`/${owner}/${repo}/${query}`} >
          # {room.name}
        </Button>
      </Box>
    })}
    <Divider />
    {/* <CreateLabel  {...{ owner, repo }} /> */}
  </Stack >
}