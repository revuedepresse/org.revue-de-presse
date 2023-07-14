<template>
  <div
    class="calendar-month"
  >
    <div
      class="calendar-month__buttons"
      :style="pickItemIcon"
    >
      <div
        class="calendar-month__container"
        @click="switchToMonthPicking"
      >
        <button
          aria-label="Sélectionner un autre mois"
          class="calendar-month__button"
          @click="switchToMonthPicking"
          v-text="monthYearLabel"
        />
      </div>
      <div class="calendar-month__navigation">
        <a
          :class="getPreviousItemClasses()"
          :href="previousMonthPath"
          :style="previousItemIcon"
          aria-label="Aller au mois précédent"
          @click.stop.prevent="goToPreviousMonth()"
        />
        <a
          :class="getNextItemClasses()"
          :href="nextMonthPath"
          :style="nextItemIcon"
          aria-label="Aller au mois suivant"
          @click.stop.prevent="goToNextMonth()"
        />
      </div>
    </div>
    <table class="calendar-month__days">
      <thead class="calendar-month__day-names">
        <tr class="calendar-month__day-row">
          <th
            v-for="(day, dayIndex) in days"
            :key="dayIndex"
            class="calendar-month__day-col"
          >
            <span
              class="calendar-month__day-name"
              v-text="day"
            />
          </th>
        </tr>
      </thead>
      <tbody
        class="calendar-month__day-numbers"
      >
        <tr
          v-for="(rowNumber, rowIndex) in dayRows()"
          :key="rowIndex"
          :data-key="rowIndex"
          class="calendar-month__day-row"
        >
          <td
            v-for="(weekDay, dayPos) in dayNumbers(rowNumber)"
            :key="dayPos"
            :class="weekDayClasses(weekDay)"
          >
            <a
              v-if="isReviewAvailable(weekDay)"
              :href="canonicalUrl(weekDay)"
              class="calendar-month__day-cell"
              @click.stop.prevent="pickDate(weekDay)"
              v-text="weekDay.getDate()"
            />
            <span
              v-else
              class="calendar-month__day-cell"
            ></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins, namespace } from 'nuxt-property-decorator'
import Time from '../../modules/time'
import pickItemIcon from '~/assets/icons/icon-pick-item.svg'
import previousItemIcon from '~/assets/icons/icon-previous-item.png'
import nextItemIcon from '~/assets/icons/icon-next-item.png'
import ApiMixin from '~/mixins/api'
import Site from '~/modules/site'

const DatePickerStore = namespace('date-picker')

@Component
class CalendarMonth extends mixins(ApiMixin) {
  @Prop({
    type: Boolean,
    default: false
  })
    isNextItemAvailable!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
    isPreviousItemAvailable!: boolean

  @Prop({
    type: Date,
    required: true
  })
    pickedDate!: Date

  @Prop({
    type: Number,
    required: true
  })
    month!: number

  @Prop({
    type: Number,
    required: true
  })
    year!: number

  days: String[] = ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.']

  @DatePickerStore.Mutation
  public pickMonth!: () => void

  @DatePickerStore.Mutation
  public intendingToPick!: (date: Date) => void

  @DatePickerStore.Mutation
  public resetPickingChoice!: () => void

  switchToMonthPicking (): void {
    this.pickMonth()
  }

  get previousItemIcon () {
    const widthOrHeight = '32px'

    return `
      --icon-previous-item-background: center / ${widthOrHeight} no-repeat url("${previousItemIcon}");
      --icon-previous-item-height: ${widthOrHeight};
      --icon-previous-item-width: ${widthOrHeight}
    `
  }

  get nextItemIcon () {
    const widthOrHeight = '32px'

    return `
      --icon-next-item-background: center / ${widthOrHeight} no-repeat url("${nextItemIcon}");
      --icon-next-item-height: ${widthOrHeight};
      --icon-next-item-width: ${widthOrHeight}
    `
  }

  get previousMonthPath () {
    const day = Time.formatDate(this.previousMonth)

    if (day === Time.formatDate(this.now())) {
      return this.homepagePath
    }

    return this.dailyHighlightsPath(day)
  }

  get nextMonthPath () {
    const day = Time.formatDate(this.nextMonth)

    if (day === Time.formatDate(this.now())) {
      return this.homepagePath
    }

    return this.dailyHighlightsPath(day)
  }

  get monthYearLabel () {
    return `${this.getMonths[this.month]} ${this.year}`
  }

  get pickItemIcon () {
    const widthOrHeight = '20px'

    return `
      --icon-pick-item-background: center / ${widthOrHeight} no-repeat url("${pickItemIcon}");
      --icon-pick-item-height: ${widthOrHeight};
      --icon-pick-item-width: ${widthOrHeight}
    `
  }

  get previousMonth (): Date {
    return this.getPreviousMonth(this.month, this.year)
  }

  get nextMonth (): Date {
    return this.getNextMonth(this.month, this.year)
  }

  get daysAfterSelectedMonth (): number {
    let dateOfLastVisibleDay

    try {
      dateOfLastVisibleDay = this.dateOfLastVisibleDay()
    } catch (e) {
      return 0
    }

    let daysAfterSelectedMonth = 0
    if (dateOfLastVisibleDay.getMonth() !== this.month) {
      daysAfterSelectedMonth = dateOfLastVisibleDay.getDate()
    }

    return daysAfterSelectedMonth
  }

  get daysBeforeSelectedMonth (): number {
    let dateOfFirstVisibleDay
    try {
      dateOfFirstVisibleDay = this.dateOfFirstVisibleDay
    } catch (e) {
      return 0
    }

    let daysBeforeSelectedMonth = 0
    if (dateOfFirstVisibleDay.getMonth() !== this.month) {
      daysBeforeSelectedMonth = this.totalDaysInPreviousMonth() - dateOfFirstVisibleDay.getDate() + 1
    }

    return daysBeforeSelectedMonth
  }

  get totalDaysInMonth (): number {
    return this.setTimezone(new Date(this.year, this.month + 1, 0)).getDate()
  }

  get dateOfFirstVisibleDay (): Date {
    const firstDayOfMonth = structuredClone(this.now())
    firstDayOfMonth.setDate(1)

    let dateOfFirstVisibleDay = this.findDateOfFirstVisibleDay(firstDayOfMonth)

    if (this.whichDateHasBeenPicked && (
      dateOfFirstVisibleDay.getDay() !== this.whichDateHasBeenPicked.getDay() ||
      dateOfFirstVisibleDay.getMonth() !== this.whichDateHasBeenPicked.getMonth() ||
      dateOfFirstVisibleDay.getFullYear() !== this.whichDateHasBeenPicked.getFullYear()
    )) {
      const dateOfFirstVisibleDayCandidate = structuredClone(this.whichDateHasBeenPicked)
      dateOfFirstVisibleDayCandidate.setDate(1)
      dateOfFirstVisibleDayCandidate.setHours(0)
      dateOfFirstVisibleDayCandidate.setMinutes(0)

      dateOfFirstVisibleDay = this.findDateOfFirstVisibleDay(dateOfFirstVisibleDayCandidate)
    }

    return dateOfFirstVisibleDay
  }

  get nameOfFirstDayOfMonth () : string {
    return this.daysOfWeek[this.setTimezone(new Date(this.year, this.month, 1)).getDay()]
  }

  dateOfLastVisibleDay () {
    let lastVisibleDayCandidate = this.nameOfLastDayOfMonth()
    const dateCandidate = this.setTimezone(new Date(this.year, this.month, this.totalDaysInMonth))

    this.guardAgainstMissingMonthOrYear(lastVisibleDayCandidate)

    while (lastVisibleDayCandidate !== 'Dim.') {
      dateCandidate.setDate(dateCandidate.getDate() + 1)
      lastVisibleDayCandidate = this.whichDayOfWeek(dateCandidate.getDay())
    }

    return dateCandidate
  }

  dayNumbers (rowNumber: number) {
    const shift = (rowNumber - 1) * 7

    return (new Array(7))
      .fill('', 0, 7)
      .map((_, index) => {
        const dayOfWeek = this.setTimezone(new Date(this.dateOfFirstVisibleDay.getTime()))
        dayOfWeek.setDate(dayOfWeek.getDate() + index + shift)

        return dayOfWeek
      })
  }

  goToPreviousMonth () {
    if (!this.isPreviousItemAvailable) {
      return
    }

    this.pickDate(this.previousMonth)
  }

  goToNextMonth () {
    if (!this.isNextItemAvailable) {
      return
    }

    this.pickDate(this.nextMonth)
  }

  findDateOfFirstVisibleDay (date: Date): Date {
    let firstVisibleDayCandidate = this.nameOfFirstDayOfMonth

    const dateCandidate = this.setTimezone(date)

    this.guardAgainstMissingMonthOrYear(firstVisibleDayCandidate)

    while (firstVisibleDayCandidate !== 'Lun.') {
      dateCandidate.setDate(dateCandidate.getDate() - 1)
      firstVisibleDayCandidate = this.whichDayOfWeek(dateCandidate.getDay())
    }

    return dateCandidate
  }

  nameOfLastDayOfMonth () {
    const lastDayNumberOfMonth = this.totalDaysInMonth

    return this.whichDayOfWeek(this.setTimezone(new Date(this.year, this.month, lastDayNumberOfMonth)).getDay())
  }

  totalDaysInPreviousMonth (): number {
    return this.setTimezone(new Date(this.year, this.month, 0)).getDate()
  }

  dayRows () {
    return Math.floor((this.daysBeforeSelectedMonth + this.totalDaysInMonth + this.daysAfterSelectedMonth) / 7)
  }

  getNextItemClasses () {
    return {
      'calendar-month__next-item': true,
      'calendar-month__next-item--disabled': !this.isNextItemAvailable
    }
  }

  getPreviousItemClasses () {
    return {
      'calendar-month__previous-item': true,
      'calendar-month__previous-item--disabled': !this.isPreviousItemAvailable
    }
  }

  isReviewAvailable (date: Date) {
    return this.setTimezone(date) <= this.now()
  }

  pickDate (date: Date) {
    const day = Time.formatDate(date)

    if (!this.$device.isDesktop && !this.$device.isTablet) {
      this.resetPickingChoice()
    }

    if (day === Time.formatDate(this.now())) {
      this.intendingToPick(this.now())
      this.navigateToHomepage()

      return
    }

    this.intendingToPick(this.setTimezone(new Date(day)))
    this.navigateToHighlightsForDay(day)
  }

  canonicalUrl (date: Date) {
    const day = Time.formatDate(date)

    return `${Site.baseURL}/${day}${this.localizeDatePath(day)}`
  }

  weekDayClasses (weekDay?: Date) {
    const defaultClass = 'calendar-month__day-number'

    if (!(weekDay instanceof Date)) {
      return {
        [defaultClass]: true
      }
    }

    return {
      [defaultClass]: true,
      'calendar-month__day-number--selected': this.formatDate(this.pickedDate) === this.formatDate(weekDay),
      'calendar-month__day-number--other-month': weekDay.getMonth() !== this.month,
      'calendar-month__day-number--future-dates': this.futureDate(weekDay)
    }
  }

  futureDate (weekDay? : Date) {
    if (!(weekDay instanceof Date)) {
      return false
    }

    return weekDay > this.setTimezone(this.now())
  }
}

export default CalendarMonth
</script>

<style lang="scss" scoped>
@import './calendar-month.scss';
</style>
