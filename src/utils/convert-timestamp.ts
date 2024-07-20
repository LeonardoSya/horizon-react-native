export default function convertTimestamp(timestamp: number | undefined) {
  if (timestamp === undefined) {
    return ' '
  } else {
    const date = new Date(timestamp * 1000)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}.${day}`
  }
}
