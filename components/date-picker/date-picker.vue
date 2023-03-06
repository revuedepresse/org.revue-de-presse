<template>
  <div class="date-picker">
    <div class="date-picker__pickers">
      <YearPicker
        v-show="pickingYear"
        :year="startDateYear"
        :is-next-item-available="isNextYearAvailable()"
        :is-previous-item-available="isPreviousYearAvailable()"
      />
      <MonthPicker
        v-show="pickingMonth"
        :month="startDateMonth"
        :year="startDateYear"
        :is-next-item-available="isNextMonthAvailable()"
        :is-previous-item-available="isPreviousMonthAvailable()"
        :visible-days-interval="visibleDaysInterval()"
      />
      <CalendarMonth
        v-show="pickingDay"
        :month="startDateMonth"
        :picked-date="pickedStartDate"
        :year="startDateYear"
        :is-next-item-available="isNextMonthAvailable()"
        :is-previous-item-available="isPreviousMonthAvailable()"
      />
    </div>
    <div
      class="date-picker__buttons"
      :style="calendarIcon"
    >
      <div
        :class="datePickerClasses()"
        :data-disabled="disabled"
        @click.stop.prevent="pickDate()"
        @mouseout="releaseDate()"
      >
        <button
          class="date-picker__button"
          :disabled="disabled"
          @click="pickDate()"
          v-text="startDateLabel"
        />
      </div>

      <div class="date-picker__navigation">
        <a
          :class="getPreviousDayClasses()"
          :href="previousDayPath"
          :style="previousDayIcon"
          aria-label="Aller au jour précédent"
          @click.stop.prevent="goToDayBeforePickedDate()"
        />
        <a
          :class="getNextDayClasses()"
          :href="nextDayPath"
          :style="nextDayIcon"
          aria-label="Aller au jour suivant"
          @click.stop.prevent="goToDayFollowingPickedDate()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins, namespace } from 'nuxt-property-decorator'
import CalendarMonth from '../calendar-month/calendar-month.vue'
import MonthPicker from '../month-picker/month-picker.vue'
import YearPicker from '../year-picker/year-picker.vue'
import DateMixin from '../../mixins/date'
import calendarIcon from '~/assets/icons/icon-pick-day.svg'
import previousDayIcon from '~/assets/icons/icon-previous-day.svg'
import previousDayActiveIcon from '~/assets/icons/icon-previous-day-active.png'
import previousDayHoverIcon from '~/assets/icons/icon-previous-day-hover.png'
import nextDayIcon from '~/assets/icons/icon-next-day.svg'
import nextDayActiveIcon from '~/assets/icons/icon-next-day-active.png'
import nextDayHoverIcon from '~/assets/icons/icon-next-day-hover.png'
import Time from '~/modules/time'

const DatePickerStore = namespace('date-picker')

@Component({
  components: { CalendarMonth, MonthPicker, YearPicker }
})
export default class DatePicker extends mixins(DateMixin) {
  @Prop({
    type: String,
    required: true
  })
    startDate!: string

  pickedDate = false

  @DatePickerStore.Getter
  public pickingDay!: boolean

  @DatePickerStore.Getter
  public pickingMonth!: boolean

  @DatePickerStore.Getter
  public pickingYear!: boolean

  @DatePickerStore.Mutation
  public pickDay!: () => void

  @DatePickerStore.Mutation
  public intendingToPick!: (date: Date) => void

  switchToDayPicking (): void {
    this.pickDay()
  }

  get calendarIcon () {
    const widthOrHeight = '19px'

    return `
      --icon-calendar-background: center / ${widthOrHeight} no-repeat url("${calendarIcon}");
      --icon-calendar-height: ${widthOrHeight};
      --icon-calendar-width: ${widthOrHeight}
    `
  }

  get pickedStartDate (): Date {
    return this.setTimezone(new Date(this.startDate))
  }

  get dayBeforePickedDate (): Date {
    const startDate = this.setTimezone(new Date(this.startDate))
    const pickedDate = this.setTimezone(new Date(startDate.getTime()))
    pickedDate.setDate(pickedDate.getDate() - 1)

    return pickedDate
  }

  get dayFollowingPickedDate (): Date {
    const startDate = this.setTimezone(new Date(this.startDate))
    const pickedDate = this.setTimezone(new Date(startDate.getTime()))
    pickedDate.setDate(pickedDate.getDate() + 1)

    return pickedDate
  }

  get disabled (): boolean {
    return this.pickingDay
  }

  get previousDayIcon () {
    const widthOrHeight = '32px'

    return `
      --icon-previous-day-background: center / ${widthOrHeight} no-repeat url("${previousDayIcon}");
      --icon-previous-day-background-active: center / ${widthOrHeight} no-repeat url("${previousDayActiveIcon}");
      --icon-previous-day-background-hover: center / ${widthOrHeight} no-repeat url("${previousDayHoverIcon}");
      --icon-previous-day-height: ${widthOrHeight};
      --icon-previous-day-width: ${widthOrHeight}
    `
  }

  get nextDayIcon () {
    const widthOrHeight = '32px'

    return `
      --icon-next-day-background: center / ${widthOrHeight} no-repeat url("${nextDayIcon}");
      --icon-next-day-background-active: center / ${widthOrHeight} no-repeat url("${nextDayActiveIcon}");
      --icon-next-day-background-hover: center / ${widthOrHeight} no-repeat url("${nextDayHoverIcon}");
      --icon-next-day-height: ${widthOrHeight};
      --icon-next-day-width: ${widthOrHeight}
    `
  }

  get previousDayPath () {
    const day = Time.formatDate(this.dayBeforePickedDate)

    if (day === Time.formatDate(this.now())) {
      return '/'
    }

    return `/${day}`
  }

  get nextDayPath () {
    const day = Time.formatDate(this.dayFollowingPickedDate)

    if (day === Time.formatDate(this.now())) {
      return '/'
    }

    return `/${day}`
  }

  get startDateLabel () {
    const date = this.setTimezone(new Date(this.startDate))
    const dayOfMonth = date.getDate()
    const daysOfWeek = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
    const months = [
      'Jan.',
      'Fév.',
      'Mar.',
      'Avr.',
      'Mai',
      'Juin',
      'Juil.',
      'Aou.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.'
    ]
    const dayOfWeek = daysOfWeek[date.getDay()]
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`
  }

  get startDateMonth (): number {
    return this.getStartDateMonth(this.startDate)
  }

  get startDateYear (): number {
    return this.getStartDateYear(this.startDate)
  }

  get month () {
    return this.startDateMonth
  }

  get year () {
    return this.startDateYear
  }

  goToDayFollowingPickedDate () {
    if (!this.isNextDayAvailable()) {
      return false
    }

    this.changeDate(this.dayFollowingPickedDate)
  }

  goToDayBeforePickedDate () {
    if (!this.isPreviousDayAvailable()) {
      return false
    }

    this.changeDate(this.dayBeforePickedDate)
  }

  mounted () {
    if (this.$device.isDesktop) {
      this.switchToDayPicking()
    }
  }

  getNextDayClasses () {
    return {
      'date-picker__next-day': true,
      'date-picker__next-day--disabled': !this.isNextDayAvailable()
    }
  }

  getPreviousDayClasses () {
    return {
      'date-picker__previous-day': true,
      'date-picker__previous-day--disabled': !this.isPreviousDayAvailable()
    }
  }

  isNextDayAvailable () {
    const today = this.now()
    const sinceDate = this.setTimezone(new Date(this.startDate))

    if (
      sinceDate.getFullYear() >= 2018 &&
      sinceDate.getFullYear() < today.getFullYear()) {
      return true
    }

    if (sinceDate.getFullYear() < 2018) {
      if (sinceDate.getMonth() < 11) {
        return false
      }

      return sinceDate.getDate() === 31
    }

    if (sinceDate.getMonth() < today.getMonth()) {
      return true
    }

    if (sinceDate.getMonth() > today.getMonth()) {
      return false
    }

    return sinceDate.getDate() < today.getDate()
  }

  isPreviousDayAvailable () {
    const today = this.now()
    const sinceDate = this.setTimezone(new Date(this.startDate))

    if (sinceDate.getFullYear() < 2018) {
      return false
    }

    if (sinceDate.getFullYear() === today.getFullYear()) {
      if (sinceDate.getMonth() < today.getMonth()) {
        return true
      }

      return sinceDate.getDate() <= today.getDate() + 1
    }

    if (
      sinceDate.getFullYear() > 2018 &&
      sinceDate.getFullYear() < today.getFullYear()) {
      return true
    }

    if (sinceDate.getMonth() > 0) {
      return true
    }

    return sinceDate.getDate() > 1
  }

  isNextYearAvailable () {
    const today = this.now()

    return this.startDateYear >= 2017 && this.startDateYear < today.getFullYear()
  }

  isPreviousYearAvailable () {
    const today = this.now()

    return this.startDateYear > 2018 && this.startDateYear <= today.getFullYear() + 1
  }

  isNextMonthAvailable () {
    const today = this.now()

    if (this.startDateYear >= 2018 && this.startDateYear < today.getFullYear()) {
      // The next month belongs to
      // a year before or equal to
      // the year following the current one
      return true
    }

    // The next month is before or equal
    // to the current month
    return this.startDateMonth + 1 <= today.getMonth()
  }

  isPreviousMonthAvailable () {
    const today = this.now()

    if (this.startDateYear > 2018 && this.startDateYear <= today.getFullYear()) {
      return true
    }

    // January 2018 being the earliest available month
    // February 2018 is the earliest month being preceding by a month
    // considered valid
    return this.startDateMonth >= 1
  }

  changeDate (date: Date) {
    const day = Time.formatDate(date)

    if (day === Time.formatDate(this.now())) {
      this.intendingToPick(this.now())
      this.$router.push({
        path: '/'
      })

      return
    }

    this.intendingToPick(this.setTimezone(new Date(day)))
    this.$router.push({
      path: `/${day}`
    })
  }

  pickDate () {
    this.pickedDate = true

    if (!this.disabled) {
      this.switchToDayPicking()
    }

    return false
  }

  releaseDate () {
    this.pickedDate = false

    return false
  }

  datePickerClasses () {
    return {
      'date-picker__container': true,
      'date-picker__container--active': this.pickedDate
    }
  }

  getStartDateMonth (startDate: string): number {
    const date = this.setTimezone(new Date(startDate))

    return date.getMonth()
  }

  getStartDateYear (startDate: string): number {
    const date = this.setTimezone(new Date(startDate))

    return date.getFullYear()
  }

  visibleDaysInterval () {
    return {
      start: this.setTimezone(new Date(this.formatMinDate())),
      end: this.setTimezone(new Date(this.formatMaxDate()))
    }
  }
}
</script>

<style lang="scss" scoped>
@import './date-picker.scss';
</style>
