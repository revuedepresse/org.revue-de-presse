<template>
  <div class="year-picker">
    <div class="year-picker__buttons">
      <div class="year-picker__navigation">
        <button
          :class="getPreviousItemClasses()"
          :style="previousItemIcon"
        />
        <button
          :class="getNextItemClasses()"
          :style="nextItemIcon"
        />
      </div>
    </div>
    <ScrollableList
      class="year-picker__scrollable-list"
      :items="acceptedYearLabels"
      :selected="year"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import ScrollableList from '../scrollable-list/scrollable-list.vue'
import previousItemIcon from '~/assets/icons/icon-previous-item.png'
import nextItemIcon from '~/assets/icons/icon-next-item.png'
import DateMixin from '~/mixins/date'

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

  get acceptedYearLabels () {
    const today = new Date()
    const years = new Array(today.getFullYear() - 2018)
    const acceptedYears = [{
      index: 0,
      label: 2018,
      isSelected: this.year === 2018
    }].concat(
      years
        .fill(2019)
        .map((year, inc) => {
          return {
            index: inc + 1,
            label: year + inc,
            isSelected: this.year === year + inc
          }
        })
    )

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
}

export default YearPicker
</script>

<style lang="scss" scoped>
@import './year-picker.scss';
</style>
