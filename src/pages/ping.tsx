import { trpc, useTrpcQuery } from '../utils/trpc'

export default function PingPage() {
  const hello = useTrpcQuery(['userRepos',])
  if (!hello.data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <p>{JSON.stringify(hello.data.account)}</p>
    </div>
  )
}