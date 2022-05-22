

export function localStorageProvider() {
  // for SSR
  if (typeof window === "undefined") {
    return new Map()
  }
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))
  const save = () => {
    console.log("save")
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  }
  window.addEventListener('beforeunload', () => {
    save()
  })
  window.addEventListener('pagehide', () => {
    save()
  })
  return map
}