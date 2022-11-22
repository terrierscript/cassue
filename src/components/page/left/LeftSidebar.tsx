import { Box, Divider, Grid, HStack, IconButton, Input, InputGroup, InputLeftElement, Link, Spacer, Stack, useColorMode, useColorModeValue, Wrap } from "@chakra-ui/react"
import { FC } from "react"
import { Rooms } from "./Rooms"
// import { GoOctoface, GoLightBulb } from "react-icons/go"
import { useChatRouteParam } from "../useChatRouteParam"
import { LightBulbIcon, MarkGithubIcon, SearchIcon } from "@primer/octicons-react"
import { UserIcon } from "./UserIcon"
import { useInverseAlpha } from "../../chakra/styleUtils"
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
    <InputGroup>
      {/* <InputLeftElement
        pointerEvents='none'
        children={<SearchIcon />}
      /> */}
      <Input
        {...register("query")}
        placeholder="Search issues"
        bg={alpha}
        rounded="full"
      />
    </InputGroup>

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
  const footerBg = useInverseAlpha(100)
  const color = useInverseAlpha(800)

  return <Grid h="100%" minH={0}
    gridTemplateRows={"max-content auto max-content"}
    bg={bg}
    color={color}>
    <Box p={6}>
      <Workspace />
    </Box>
    <Box overflow={"scroll"} p={6} gridGap={0}>
      <Rooms />
    </Box>
    <Box>
      <HStack p={6}>
        <UserIcon />
        <Spacer />
        <ThemeSwitcher />
      </HStack>
    </Box>
  </Grid>
}

export default LeftSidebar