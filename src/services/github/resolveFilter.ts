
export const resolveFilter = (filter: string[] = []) => {
  const [type, value] = filter
  switch (type) {
    case "labels":
      return { labels: value }
  }
  return {}
}
export const resolveFilterToPost = (filter: string[] = []) => {
  const [type, value] = filter
  switch (type) {
    case "labels":
      return { labels: [value] }
  }
  return {}
}
