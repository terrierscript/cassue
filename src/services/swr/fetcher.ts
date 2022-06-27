export const jsonFetcher = (url: RequestInfo) => {
  return fetch(url).then(r => r.json())
}

const wait = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const delayJsonFetcher = (url: RequestInfo) => {
  return fetch(url).then(r => {
    return wait(3000).then(() => r)
  }).then((r) => {
    return r.json()
  })
}

export const fetchPost = async (url: string, body: any) => {
  return await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(body)
  })
}