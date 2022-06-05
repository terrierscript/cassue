import { Box, Button, Center, Spinner, VStack } from "@chakra-ui/react"
import { FC, PropsWithChildren, Suspense } from "react"
import Head from "next/head"
import { RepositoryQuery } from "../../../../../services/github/Schema"
// import { IssueChatPage } from "../../../../components/page/IssueChatPage"
import { useChatRouteParam } from "../../../../../components/page/useChatRouteParam"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { useRepoExist } from "../../../../../components/page/apiHooks"

const IssueChatPage = dynamic(import("../../../../../components/page/ChatPage"))

export type Props = {
  error?: string,
} & RepositoryQuery

const PageHead: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()
  const manifestVersion = "20220605-2"
  return <Head>
    <title>{owner}/{repo}</title>
    <link rel="manifest" href={`/api/repos/${owner}/${repo}/manifest/${manifestVersion}.webmanifest`} />
    <script async src="https://unpkg.com/pwacompat" crossOrigin="anonymous"></script>
  </Head>
}

const RepoExist: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { owner, repo } = useChatRouteParam()
  const { data, error } = useRepoExist({ owner, repo })
  console.log(data, error)
  if (data === false) {
    return <Center p={4}>
      <VStack>
        <Box>Repository Not found</Box>
        <Button as="a" href="/">Select another repositoruy</Button>
      </VStack>
    </Center>
  }
  if (!data) {
    return <Center p={4}>
      <Spinner />
    </Center>
  }
  return <>{children}</>
}
export const Page: FC<Props> = ({ }) => {
  const router = useRouter()
  if (!router.isReady) {
    return <Spinner />
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
