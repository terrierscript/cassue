import { Box, Divider, Grid, HStack, IconButton, Link, Spacer, Stack, useColorMode, useColorModeValue, Wrap } from "@chakra-ui/react"
import { FC } from "react"
import { Rooms } from "./Rooms"
// import { GoOctoface, GoLightBulb } from "react-icons/go"
import { useChatRouteParam } from "../useChatRouteParam"
import { LightBulbIcon, MarkGithubIcon } from "@primer/octicons-react"
import { UserIcon } from "./UserIcon"

const ThemeSwitcher = () => {
  const { toggleColorMode } = useColorMode()
  return <Box>
    <IconButton

      onClick={() => toggleColorMode()}
      // variant="outline"
      // colorScheme="gray"
      aria-label={"Change theme"}
      icon={<LightBulbIcon />} />
  </Box>
}

const useAlpha = (value: number) => {
  return useColorModeValue(`blackAlpha.${value}`, `whiteAlpha.${value}`)
}

const Debugger = () => {
  const cacheSize = JSON.parse(localStorage.getItem('app-cache') ?? "{}")
  return <Box color="gray.500">
    Cache:  {Object.keys(cacheSize).length}
  </Box>
}


const Workspace = () => {
  const { owner, repo } = useChatRouteParam()

  return <HStack>
    <Box>
      <IconButton as="a" href={`https://github.com/${owner}/${repo}/issues`} aria-label={"open github"} variant="ghost" colorScheme="gray" target="_blank">
        <MarkGithubIcon />
      </IconButton>
    </Box>
    {/* <Wrap spacing={1}>
      <Box fontWeight={"bold"}>
        <Link href={`https://github.com/${owner}`}>
          {owner}
        </Link>
      </Box>
      <Box>{`/`}</Box>
      <Box fontWeight={"bold"}>
        {repo}
      </Box>
    </Wrap > */}
  </HStack>
}

export const LeftSidebar: FC<{}> = () => {

  const bg = useAlpha(200)
  const color = useAlpha(800)

  return <Grid h="100%" minH={0} p={6} gap={4}
    gridTemplateRows={"max-content auto max-content"}
    bg={bg}
    color={color}>
    <Box>
      <Workspace />
    </Box>
    <Box overflow={"scroll"}>
      <Rooms />
    </Box>
    <Box>
      <Divider />
      {/* <Debugger /> */}
      <HStack>
        <UserIcon />
        <Spacer />
        <ThemeSwitcher />
      </HStack>
    </Box>
  </Grid>
}

export default LeftSidebar