import { Box, Divider, Link, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { RepositoryQuery } from "../../../services/github/Schema"
import { useLabels } from "../apiHooks"
import { CreateLabel } from "./CreateLabel"

type Room = {
  name: string,
}
export const Rooms: FC<RepositoryQuery> = ({ owner, repo }) => {
  const { data } = useLabels({ owner, repo })
  const rooms = data?.labels ?? []
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
      return <Box key={room.name}>
        <Link href={`/${owner}/${repo}/${room.name}`}>
          # {room.name}
        </Link>
      </Box>
    })}
    <Divider />
    {/* <CreateLabel  {...{ owner, repo }} /> */}
  </Stack>
}