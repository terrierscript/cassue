import { Box, Spinner } from "@chakra-ui/react"
import { FC, Suspense } from "react"
import Head from "next/head"
import { RepositoryQuery } from "../../../../services/github/Schema"
// import { IssueChatPage } from "../../../../components/page/IssueChatPage"
import { useChatRouteParam } from "../../../../components/page/useChatRouteParam"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

const IssueChatPage = dynamic(import("../../../../components/page/ChatPage"))

export type Props = {
  error?: string,
} & RepositoryQuery

const PageHead: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()

  return <Head>
    <title>{owner}/{repo}</title>
    <link rel="manifest" href={`/api/rooms/${owner}/${repo}/manifest.webmanifest`} />
    <script async src="https://unpkg.com/pwacompat" crossOrigin="anonymous"></script>
  </Head>
}

export const Page: FC<Props> = ({ }) => {
  const router = useRouter()
  if (!router.isReady) {
    return <Spinner />
  }

  return <Box>
    <PageHead />
    <IssueChatPage />
  </Box>
}

// export const getServerSideProps: GetServerSideProps = async (req) => {

//   return {
//     props: {}
//   }
// }

export default Page
