<template>
  <div class="year-picker">
    <div class="year-picker__buttons">
      <div class="year-picker__navigation">
        <button
          :class="getPreviousItemClasses()"
          :style="previousItemIcon"
          @click="goToYearBeforePickedDate"
        />
        <button
          :class="getNextItemClasses()"
          :style="nextItemIcon"
          @click="goToYearFollowingPickedDate"
        />
      </div>
    </div>
    <ScrollableList
      class="year-picker__scrollable-list"
      :items="acceptedYears"
      :selected="year"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins, namespace } from 'nuxt-property-decorator'
import ScrollableList from '../scrollable-list/scrollable-list.vue'
import previousItemIcon from '~/assets/icons/icon-previous-item.png'
import nextItemIcon from '~/assets/icons/icon-next-item.png'
import DateMixin from '~/mixins/date'
import Time from '~/modules/time'

const DatePickerStore = namespace('date-picker')

@Component({
  components: { ScrollableList }
})
class YearPicker extends mixins(DateMixin) {
  @Prop({
    type: Number,
    required: true
  })
    year!: number

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

  @DatePickerStore.Mutation
  public pickMonth!: () => void

  @DatePickerStore.Mutation
  public intendingToPick!: (date: Date) => void

  switchToMonthPicking (): void {
    this.pickMonth()
  }

  get acceptedYears () {
    const today = this.now()
    const years = new Array(today.getFullYear() - 2018)

    const acceptedYears = [{
      index: 0,
      label: 2018,
      isSelected: this.year === 2018,
      onClick: () => {
      }
    }].concat(
      years
        .fill(2019)
        .map((year, inc) => {
          return {
            index: inc + 1,
            label: year + inc,
            isSelected: this.year === year + inc,
            onClick: () => {
            }
          }
        })
    ).map((acceptedYear) => {
      acceptedYear.onClick = () => {
        this.pickDate(this.setTimezone(new Date(`${acceptedYear.label}-01-01`)))
      }
      return acceptedYear
    })

    return acceptedYears
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

  getNextItemClasses () {
    return {
      'year-picker__next-item': true,
      'year-picker__next-item--disabled': !this.isNextItemAvailable
    }
  }

  getPreviousItemClasses () {
    return {
      'year-picker__previous-item': true,
      'year-picker__previous-item--disabled': !this.isPreviousItemAvailable
    }
  }

  goToYearBeforePickedDate () {
    if (!this.isPreviousItemAvailable) {
      return false
    }

    this.pickDate(this.setTimezone(new Date(`${this.year - 1}-01-01`)))

    return false
  }

  goToYearFollowingPickedDate () {
    if (!this.isNextItemAvailable) {
      return false
    }

    this.pickDate(this.setTimezone(new Date(`${this.year + 1}-01-01`)))

    return false
  }

  pickDate (date: Date) {
    const day = Time.formatDate(date)

    if (day === Time.formatDate(this.now())) {
      this.intendingToPick(this.now())
      this.switchToMonthPicking()

      return
    }

    this.intendingToPick(this.setTimezone(new Date(day)))
    this.switchToMonthPicking()
  }
}

export default YearPicker
</script>

<style lang="scss" scoped>
@import './year-picker.scss';
</style>
