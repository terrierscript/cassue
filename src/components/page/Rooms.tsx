import { Box, Link, Stack } from "@chakra-ui/react"


export const Rooms = () => {
  const rooms = [{
    name: "is:open"
  }, {
    name: "is:close"
  }]
  return <Stack p={8} w={240} bg="orange.600" h="100%">
    {rooms.map(room => {
      return <Box key={room.name} color="white" fontWeight={"bold"}>
        <Link href={``}>
          # {room.name}
        </Link>
      </Box>
    })}
  </Stack>
}