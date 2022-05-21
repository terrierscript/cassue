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
        <Link display={"block"} href={`/${owner}/${repo}/${query}`} >
          # {room.name}
        </Link>
      </Box>
    })}
    <Divider />
    {/* <CreateLabel  {...{ owner, repo }} /> */}
  </Stack >
}