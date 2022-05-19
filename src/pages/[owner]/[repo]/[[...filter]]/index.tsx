import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { FC } from "react"
import { getAccessToken } from "../../../../services/auth/getAccessToken"
import { GithubClient, IssueResponse } from "../../../../services/github/client"
import { IssueChatPage, ChatInput } from "../../../../components/page/IssueChatPage"
import { LoginButton } from "../../../../components/Login"

export const Page: FC<{ error?: string, issues: IssueResponse[] }> = ({ error, issues }) => {
  if (error) {
    return <Box>
      {error}
      <LoginButton />
    </Box>
  }
  return <Box>
    <IssueChatPage issues={issues} />
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
      issues
    }
  }
}

export default Page