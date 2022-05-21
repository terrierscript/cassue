import { Box, Stack } from "@chakra-ui/react"


export const Rooms = () => {
  const rooms = [{
    name: "is:open"
  }]
  return <Stack>
    {rooms.map(room => {
      return <Box key={room.name}>
        {room.name}
      </Box>
    })}
  </Stack>
}