import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { FC } from "react"
import { IssueChatPage } from "../../../../components/page/IssueChatPage"
import Head from "next/head"
import { IssueParam, IssueParamScheme } from "../../../../services/github/client"

export type Props = {
  error?: string,
} & IssueParam

const PageHead: FC<Props> = ({ owner, repo }) => {
  return <Head>
    <title>{owner}/{repo}</title>
    <link rel="manifest" href={`/api/issues/${owner}/${repo}/manifest.webmanifest`} />
  </Head>
}
export const Page: FC<Props> = ({ error, ...issueChatProps }) => {
  return <Box>
    <PageHead {...issueChatProps} />
    <IssueChatPage  {...issueChatProps} />
  </Box>
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const { owner, repo, filter } = IssueParamScheme.parse(req.query)

  return {
    props: {
      owner,
      repo,
      // issues
    }
  }
}

export default Page
