export const dateDif = (firstDate, secondDate) => {
  firstDate = new Date(Date.parse(firstDate))
  secondDate = secondDate ? new Date(Date.parse(secondDate)) : new Date()
  return Math.ceil((firstDate.getTime() - secondDate.getTime()) / (1000 * 3600 * 24))
}

export const inDate = (startDate, checkData, endDate) => {
  startDate = new Date(Date.parse(startDate))
  startDate.setHours(0, 0, 0, 0)
  checkData = new Date(checkData)
  checkData.setHours(0, 0, 0, 0)
  endDate = new Date(Date.parse(endDate))
  endDate.setHours(0, 0, 0, 0)

  return ((startDate.getTime() <= checkData.getTime()) && (endDate.getTime() >= checkData.getTime()))
}

export const todayDate = () => {
  const date = new Date()

  let day = date.getDate()
  let month = date.getMonth() + 1
  const year = date.getFullYear()

  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day

  const today = year + '-' + month + '-' + day

  return today
}
