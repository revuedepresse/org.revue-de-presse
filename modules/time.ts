import { setTimezone } from '../mixins/date'
const padWithCharacter = (subject: number, character: number): string => {
  let paddedSubject = subject.toString()
  if (subject < 10) {
    paddedSubject = `${character}${subject}`
  }

  return paddedSubject
}

const padDateDay = (date: Date) => padWithCharacter(date.getDate(), 0)

const formatDate = (date: Date) => {
  const day = padDateDay(date)
  const month = padWithCharacter(date.getMonth() + 1, 0)
  return `${date.getFullYear()}-${month}-${day}`
}

const yesterday = () => {
  const date = setTimezone(new Date())
  date.setDate(date.getDate() - 1)

  return formatDate(date)
}

const today = (): string => formatDate(setTimezone(new Date()))

export default {
  formatDate,
  today,
  yesterday
}
