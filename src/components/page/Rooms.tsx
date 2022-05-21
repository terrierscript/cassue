import { Box, Divider, Link, Stack } from "@chakra-ui/react"
import { FC } from "react"
import { IssuePageProps } from "./Props"


type Room = {
  name: string,
}
export const Rooms: FC<IssuePageProps> = ({ owner, repo }) => {
  const rooms = [{
    name: "is:open"
  }, {
    name: "is:close"
  }]
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
        <Link href={``}>
          # {room.name}
        </Link>
      </Box>
    })}
  </Stack>
}