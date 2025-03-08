import { Component, Vue } from 'nuxt-property-decorator'
import Time from '../modules/time'
import Errors from '../modules/errors'

const clientTimezone = Intl.DateTimeFormat()
  .resolvedOptions().timeZone

export const formatDate = (date: Date): string => {
  return Time.formatDate(date)
}

export const isValidDate = (day: string): boolean => {
  const matching = day.match(new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d$', 'gi'))

  if (matching === null) {
    return false
  }

  return Time.formatDate(new Date(day)) === day
}

export const setTimezone = (date: Date, timezone = clientTimezone): Date => {
  return new Date(date.toLocaleString('en-US', { timeZone: timezone }))
}

export const getMinDate = () => {
  return setTimezone(new Date(Date.parse('01 Jan 2018 00:00:00 GMT')))
}

export const yesterday = (timezone = clientTimezone): Date => {
  const date = setTimezone(new Date(), timezone)
  date.setDate(date.getDate() - 1)

  return date
}

@Component
export default class DateMixin extends Vue {
  get daysOfWeek (): Array<string> {
    return ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
  }

  get getMonths () {
    return [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ]
  }

  defaultDates (date: Date|null) {
    if (date !== null) {
      return {
        startDate: Time.formatDate(date),
        endDate: Time.formatDate(date)
      }
    }

    let { day, endDate } = this.$route.params

    if (day === '1970-01-01' || !day || !this.isValidDate(day)) {
      day = this.formatMaxDate()
    }

    if (endDate === '1970-01-01' || !endDate) {
      endDate = this.formatMaxDate()
    }

    return {
      startDate: day,
      endDate
    }
  }

  isValidDate (day: string) {
    return isValidDate(day)
  }

  formatDate (date: Date) {
    return formatDate(date)
  }

  guardAgainstMissingMonthOrYear (candidate: string|undefined) {
    if (candidate === undefined) {
      throw new Errors.MissingMonthOrYear('Definition of month and year properties, data, computed or props are to be defined')
    }
  }

  getMinDate (): Date {
    return getMinDate()
  }

  formatMinDate () {
    return Time.formatDate(this.setTimezone(this.getMinDate()))
  }

  formatMaxDate (): string {
    return Time.yesterday()
  }

  getNextMonth (month: number, year: number): Date {
    if (month === 11) {
      return this.setTimezone(new Date(year + 1, 0, 1))
    }

    return this.setTimezone(new Date(year, month + 1, 1))
  }

  getPreviousMonth (month: number, year: number): Date {
    if (month === 0) {
      return this.setTimezone(new Date(year - 1, 11, 1))
    }

    return this.setTimezone(new Date(year, month - 1, 1))
  }

  setTimezone (date: Date, timezone = clientTimezone): Date {
    return setTimezone(date, timezone)
  }

  now (timezone = clientTimezone): Date {
    return yesterday(timezone)
  }

  whichDayOfWeek (dayNumber: number): string {
    return this.daysOfWeek[dayNumber]
  }

  get whichDateHasBeenPicked (): Date|null {
    return this.$store.getters['date-picker/datePicker']()
  }
}
