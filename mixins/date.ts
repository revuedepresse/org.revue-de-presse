import { Component, Vue } from 'nuxt-property-decorator'
import Time from '../modules/time'
import Errors from '../modules/errors'

export const setTimezone = (date: Date, timezone = 'Europe/Paris'): Date => {
  return new Date(date.toLocaleString('en-US', { timeZone: timezone }))
}

export const now = (timezone = 'Europe/Paris'): Date => {
  return setTimezone(new Date(), timezone)
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

  defaultDates () {
    let { day, endDate } = this.$route.params

    if (day === '1970-01-01' || !day) {
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

  formatDate (date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  guardAgainstMissingMonthOrYear (candidate: string|undefined) {
    if (candidate === undefined) {
      throw new Errors.MissingMonthOrYear('Definition of month and year properties, data, computed or props are to be defined')
    }
  }

  getMinDate (): Date {
    return new Date(Date.parse('01 Jan 2018 00:00:00 GMT'))
  }

  formatMinDate () {
    return Time.formatDate(this.setTimezone(this.getMinDate()))
  }

  formatMaxDate (): string {
    return Time.today()
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

  setTimezone (date: Date, timezone = 'Europe/Paris'): Date {
    return setTimezone(date, timezone)
  }

  now (timezone = 'Europe/Paris'): Date {
    return now(timezone)
  }

  whichDayOfWeek (dayNumber: number): string {
    return this.daysOfWeek[dayNumber]
  }
}
