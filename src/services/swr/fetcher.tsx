export const jsonFetcher = (url: RequestInfo) => {
  return fetch(url).then(r => r.json())
}
