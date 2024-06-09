export default function convertTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}.${day}`
}
