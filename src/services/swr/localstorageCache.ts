import { Cache } from "swr"
const KEY_NAME = "app-cache-v2"

const save = (map: Map<string, any>) => {
  console.log("save")
  const appCache = JSON.stringify(Array.from(map.entries()))
  localStorage.setItem(KEY_NAME, appCache)
}

export function localStorageProvider(cache: Readonly<Cache>): Cache {
  // for SSR
  if (typeof window === "undefined") {
    return new Map()
  }
  const map: Map<string, any> = new Map(JSON.parse(localStorage.getItem(KEY_NAME) || '[]'))
  window.addEventListener('beforeunload', () => {
    save(map)
  })
  window.addEventListener('pagehide', () => {
    save(map)
  })
  // performance reason
  // window.addEventListener('unload', () => {
  //   save()
  // })
  window.addEventListener('visibilitychange', () => {
    save(map)
  })

  return map
}

export function clearLocalStorageCache() {
  save(new Map())
}