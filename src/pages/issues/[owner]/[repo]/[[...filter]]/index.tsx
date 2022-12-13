import { Box, Button, Center, HStack, Spinner, VStack } from "@chakra-ui/react"
import { FC, PropsWithChildren, Suspense } from "react"
import Head from "next/head"
import { RepositoryQuery } from "../../../../../services/github/Schema"
// import { IssueChatPage } from "../../../../components/page/IssueChatPage"
import { useChatRouteParam } from "../../../../../components/page/useChatRouteParam"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { useRepoExist } from "../../../../../components/page/apiHooks"
import { signOut, useSession } from "next-auth/react"
import { CenterSpinner } from "../../../../../components/layout/CenterSpinner"
import { GithubLoginButton } from "../../../../../components/layout/GithubLoginButton"

const IssueChatPage = dynamic(import("../../../../../components/page/ChatPage"))

export type Props = {
  error?: string,
} & RepositoryQuery

const PageHead: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()
  const manifestVersion = "20220605-2"
  return <Head>
    <title>{owner}/{repo}</title>
    <link rel="manifest" href={`/api/manifest/${owner}/${repo}/${manifestVersion}/manifest.webmanifest?v2`} />
    <meta name="apple-mobile-web-app-status-bar-style" content="black"></meta>
    <script async src="https://unpkg.com/pwacompat" crossOrigin="anonymous"></script>
  </Head>
}

const NotExistLogin = () => {
  const session = useSession()
  if (session.status === "loading") {
    return null
  }
  if (!session.data) {
    return <GithubLoginButton >
      Login
    </GithubLoginButton>
  }
  return <Button colorScheme={"red"} onClick={() => {
    signOut()
  }}>Logout</Button>
}
const RepoExist: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { owner, repo } = useChatRouteParam()
  const { data, error } = useRepoExist({ owner, repo })

  if (!data) {
    return <CenterSpinner>
      Loading Repository
    </CenterSpinner>
  }
  if (data.exist === false) {
    return <Center p={4} h="100vh">
      <VStack>
        <Box>Repository Not found</Box>
        <Button as="a" href="/">Select another repository</Button>
        <Box>or</Box>
        <NotExistLogin />
      </VStack>
    </Center>
  }
  return <>{children}</>
}
export const Page: FC<Props> = ({ }) => {
  const router = useRouter()
  if (!router.isReady) {
    return <CenterSpinner >
      Router Loading
    </CenterSpinner>
  }

  return <Box>
    <PageHead />
    <RepoExist>
      <IssueChatPage />
    </RepoExist>
  </Box>
}

// export const getServerSideProps: GetServerSideProps = async (req) => {

//   return {
//     props: {}
//   }
// }

export default Page
