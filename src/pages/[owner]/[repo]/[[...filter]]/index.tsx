import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { FC } from "react"
import { getAccessToken } from "../../../../services/auth/getAccessToken"
import { GithubClient } from "../../../../services/github/client"
import { IssueChatPage } from "../../../../components/page/IssueChatPage"
import { IssuePageProps } from "../../../../components/page/Props"
import { LoginButton } from "../../../../components/Login"

type Props = {
  error?: string,
} & IssuePageProps

export const Page: FC<Props> = ({ error, ...issueChatProps }) => {
  if (error) {
    return <Box>
      {error}
      <LoginButton />
    </Box>
  }
  return <Box>
    <IssueChatPage  {...issueChatProps} />
  </Box>
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const accessToken = await getAccessToken(req)
  if (!accessToken) {
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

  const accessor = new GithubClient(accessToken)
  // // // console.log(accessor)
  const issues = await accessor.getIssue({ owner, repo })
  return {
    props: {
      owner,
      repo,
      issues
    }
  }
}

export default Page