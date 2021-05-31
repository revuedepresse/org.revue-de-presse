<template>
  <div class="month-picker">
    <div
      class="month-picker__buttons"
      :style="pickItemIcon"
    >
      <div class="month-picker__container">
        <button
          class="month-picker__button"
          @click="switchToYearPicking"
          v-text="yearLabel"
        />
      </div>

      <div class="month-picker__navigation">
        <button
          :class="getPreviousItemClasses()"
          :style="previousItemIcon"
          @click="goToMonthBeforePickedDate"
        />
        <button
          :class="getNextItemClasses()"
          :style="nextItemIcon"
          @click="goToMonthFollowingPickedDate"
        />
      </div>
    </div>
    <ScrollableList
      :items="months"
      :selected="month"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins, namespace } from 'nuxt-property-decorator'
import ScrollableList from '../scrollable-list/scrollable-list.vue'
import pickItemIcon from '~/assets/icons/icon-pick-item.svg'
import previousItemIcon from '~/assets/icons/icon-previous-item.png'
import nextItemIcon from '~/assets/icons/icon-next-item.png'
import DateMixin from '~/mixins/date'
import Time from '~/modules/time'

type DateInterval = {
  start: Date,
  end: Date
}

const DatePickerStore = namespace('date-picker')

@Component({
  components: { ScrollableList }
})
class MonthPicker extends mixins(DateMixin) {
  @Prop({
    type: Boolean,
    required: true
  })
  isNextItemAvailable!: boolean

  @Prop({
    type: Boolean,
    required: true
  })
  isPreviousItemAvailable!: boolean

  @Prop({
    type: Number,
    required: true
  })
  month!: number

  @Prop({
    type: Object,
    required: true
  })
  visibleDaysInterval!: DateInterval

  @Prop({
    type: Number,
    required: true
  })
  year!: number

  @DatePickerStore.Mutation
  public pickYear!: () => void

  get yearLabel () {
    return `${this.year}`
  }

  get months () {
    return this.getMonths
      .map((m, index) => {
        const isEnabled = (
          this.year >= this.visibleDaysInterval.start.getFullYear() &&
              this.year < this.visibleDaysInterval.end.getFullYear()
        ) || (
          this.year === this.visibleDaysInterval.end.getFullYear() &&
              index <= this.visibleDaysInterval.end.getMonth()
        )

        return {
          index,
          label: m,
          isSelected: this.month === index,
          isDisabled: !isEnabled,
          onClick: () => {
            this.pickDate(new Date(`${this.year}-${index + 1}-01`))
          }
        }
      })
  }

  get pickItemIcon () {
    const widthOrHeight = '20px'

    return `
      --icon-pick-item-background: center / ${widthOrHeight} no-repeat url("${pickItemIcon}");
      --icon-pick-item-height: ${widthOrHeight};
      --icon-pick-item-width: ${widthOrHeight}
    `
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

  get visibleDaysStart () {
    return this.visibleDaysInterval.start
  }

  get visibleDaysEnd () {
    return this.visibleDaysInterval.end
  }

  getNextItemClasses () {
    return {
      'month-picker__next-item': true,
      'month-picker__next-item--disabled': !this.isNextItemAvailable
    }
  }

  getPreviousItemClasses () {
    return {
      'month-picker__previous-item': true,
      'month-picker__previous-item--disabled': !this.isPreviousItemAvailable
    }
  }

  goToMonthBeforePickedDate () {
    if (!this.isPreviousItemAvailable) {
      return false
    }

    let year = this.year
    let month = this.month

    if (this.month === 0) {
      year = this.year - 1
      month = 12
    }

    let date = new Date(`${year}-${month}-01`)
    if (month < 10) {
      date = new Date(`${year}-0${month}-01`)
    }

    this.pickDate(date)

    return false
  }

  goToMonthFollowingPickedDate () {
    if (!this.isNextItemAvailable) {
      return false
    }

    let year: number = this.year
    let month: number = this.month

    if (this.month === 11) {
      year = this.year + 1
      month = 1
    } else {
      month = month + 2
    }

    let date = new Date(`${year}-${month}-01`)
    if (month < 10) {
      date = new Date(`${year}-0${month}-01`)
    }

    this.pickDate(date)

    return false
  }

  pickDate (date: Date) {
    const startDate = Time.formatDate(date)

    this.$router.push({
      name: 'daily-review',
      params: { startDate }
    })
  }

  switchToYearPicking (): void {
    this.pickYear()
  }
}

export { DateInterval }

export default MonthPicker
</script>

<style lang="scss" scoped>
@import './month-picker.scss';
</style>
