import { Box, Divider, Grid, HStack, IconButton, Input, Link, Spacer, Stack, useColorMode, useColorModeValue, Wrap } from "@chakra-ui/react"
import { FC } from "react"
import { Rooms } from "./Rooms"
// import { GoOctoface, GoLightBulb } from "react-icons/go"
import { useChatRouteParam } from "../useChatRouteParam"
import { LightBulbIcon, MarkGithubIcon } from "@primer/octicons-react"
import { UserIcon } from "./UserIcon"
import { useInverseAlpha } from "../../atomic/styleUtils"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"

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

const SearchIssue = () => {
  const alpha = useAlpha(100)
  const router = useRouter()
  const { owner, repo } = useChatRouteParam()
  const { register, handleSubmit } = useForm()
  const onSubmit = handleSubmit((data) => {
    const url = `https://github.com/${owner}/${repo}/issues?q=is%3Aissue+${encodeURIComponent(data.query)}`
    router.push(url)
  })
  return <form onSubmit={onSubmit}>
    <Input
      {...register("query")}
      placeholder="Search issue"
      bg={alpha}
      rounded="full"
    />
  </form>

}
const Workspace = () => {
  const { owner, repo } = useChatRouteParam()
  return <HStack>
    <Box>
      <IconButton as="a" href={`https://github.com/${owner}/${repo}/issues`} aria-label={"open github"} variant="ghost" colorScheme="gray" target="_blank">
        <MarkGithubIcon />
      </IconButton>
    </Box>
    <Box>
      <SearchIssue />
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

  const bg = useInverseAlpha(200)
  const color = useInverseAlpha(800)

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