import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { FC } from "react"
import { getSessionAccount } from "../../../../services/auth/getSessionAccount"
import { IssueChatPage } from "../../../../components/page/IssueChatPage"
import { IssuePageProps } from "../../../../components/page/Props"
import { LoginButton } from "../../../../components/Login"
import Head from "next/head"

export type Props = {
  error?: string,
} & IssuePageProps

const ManifestLink: FC<Props> = ({ owner, repo }) => {
  return <link rel="manifest" href={`/api/issues/${owner}/${repo}/manifest.webmanifest`} />
}
export const Page: FC<Props> = ({ error, ...issueChatProps }) => {
  if (error) {
    return <Box>
      {error}
      <LoginButton />
    </Box>
  }
  return <Box>
    <Head>
      <ManifestLink {...issueChatProps} />
    </Head>
    <IssueChatPage  {...issueChatProps} />
  </Box>
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const account = await getSessionAccount(req)
  if (!account) {
    return {
      props: {
        error: "needLogin"
      }
    }
  }
  const { owner, repo, filter } = req.query
  if (typeof owner !== "string" || typeof repo !== "string") {
    return {
      props: {
        error: "invalid_param"
      }
    }
  }

  // const accessor = new GithubClient(account)
  // // // // console.log(accessor)
  // const issues = await accessor.getIssue({ owner, repo })
  return {
    props: {
      owner,
      repo,
      // issues
    }
  }
}

export default Page
