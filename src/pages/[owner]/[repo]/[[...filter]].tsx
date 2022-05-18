import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { GithubAccessor } from "../../../services/github/issues"

export const Page = () => {
  return <Box>
    pp
  </Box>
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const session = await getSession(req)
  const { owner, repo, filter } = req.query
  console.log(session.token.accessToken)
  const accessor = new GithubAccessor(session.token.accessToken)
  // // // console.log(accessor)
  const r = await accessor.getIssue({ owner, repo })
  console.log(r)
  return {
    props: {}
  }
}

export default Page