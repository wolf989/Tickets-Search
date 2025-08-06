export function timeHumanize(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} хв`
  }
  else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours} год ${mins} хв`
  }
  else {
    const days = Math.floor(minutes / 1440)
    const hours = Math.floor((minutes % 1440) / 60)
    return `${days} д ${hours} год`
  }
}
