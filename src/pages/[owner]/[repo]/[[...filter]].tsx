import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { FC } from "react"
import { getAccessToken } from "../../../services/auth/getAccessToken"
import { GithubClient, IssueResponse } from "../../../services/github/client"

const Issue: FC<{ issue: IssueResponse }> = ({ issue }) => {
  return <Box>{issue.title}</Box>
}

export const Page: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  console.log(issues)
  return <Box>
    {issues.map((issue, key) => {
      return <Issue issue={issue} key={key} />
    })}
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
  // console.log(session.token.accessToken)
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