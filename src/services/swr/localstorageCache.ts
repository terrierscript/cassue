import { Cache } from "swr"
const KEY_NAME = "app-cache-v2"

const save = (map: Map<unknown, unknown>) => {
  console.log("save")
  const appCache = JSON.stringify(Array.from(map.entries()))
  localStorage.setItem(KEY_NAME, appCache)
}

export function localStorageProvider() {
  // for SSR
  if (typeof window === "undefined") {
    return new Map()
  }
  const map = new Map(JSON.parse(localStorage.getItem(KEY_NAME) || '[]'))
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