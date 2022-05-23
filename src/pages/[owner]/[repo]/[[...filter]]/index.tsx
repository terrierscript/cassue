import { Box, Spinner } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { FC } from "react"
import Head from "next/head"
import { IssuesTargetQueryScheme, RepositoryQuery, RepositoryQueryScheme } from "../../../../services/github/Schema"
import { IssueChatPage } from "../../../../components/page/IssueChatPage"
import { useChatRouteParam } from "../../../../components/page/useChatRouteParam"
import { useRouter } from "next/router"

export type Props = {
  error?: string,
} & RepositoryQuery

const PageHead: FC<{}> = ({ }) => {
  const { owner, repo } = useChatRouteParam()

  return <Head>
    <title>{owner}/{repo}</title>
    <link rel="manifest" href={`/api/issues/${owner}/${repo}/manifest.webmanifest`} />
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
