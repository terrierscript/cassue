export const jsonFetcher = (url: RequestInfo) => {
  return fetch(url).then(r => r.json())
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