import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { GithubClient } from "../../../services/github/client"

export const Page = () => {
  return <Box>
    pp
  </Box>
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const session = await getSession(req)
  if (!session.token.accessToken) {
    return {
      props: "x"
    }
  }
  const { owner, repo, filter } = req.query
  // console.log(session.token.accessToken)
  const accessor = new GithubClient(session.token.accessToken)
  // // // console.log(accessor)
  const r = await accessor.getIssue({ owner, repo })
  console.log(r)
  return {
    props: {}
  }
}

export default Page