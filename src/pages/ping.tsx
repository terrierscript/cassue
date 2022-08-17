import { trpc, useTrpcQuery } from '../utils/trpc'

export default function PingPage() {
  const hello = useTrpcQuery(['hello', { text: 'client' }])
  if (!hello.data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  )
}