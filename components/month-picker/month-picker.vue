<template>
  <div class="month-picker">
    <div
      class="month-picker__buttons"
      :style="pickItemIcon"
    >
      <div class="month-picker__container">
        <button
          class="month-picker__button"
          v-text="yearLabel"
        />
      </div>

      <div class="month-picker__navigation">
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
      :items="monthLabels"
      :selected="this.month"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Mixins } from 'vue-mixin-decorator'
import ScrollableList from '../scrollable-list/scrollable-list.vue'
import pickItemIcon from '~/assets/icons/icon-pick-item.svg'
import previousItemIcon from '~/assets/icons/icon-previous-item.png'
import nextItemIcon from '~/assets/icons/icon-next-item.png'
import DateMixin from '~/mixins/date'

const Props = Vue.extend({
  props: {
    isNextItemAvailable: {
      type: Boolean,
      default: false
    },
    isPreviousItemAvailable: {
      type: Boolean,
      default: false
    },
    month: {
      type: Number,
      required: true
    },
    visibleDaysInterval: {
      type: Object,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  }
})

@Component({ components: { ScrollableList } })
class MonthPicker extends Mixins<MonthPickerInterface>(DateMixin, Props) {
  get yearLabel () {
    return `${this.year}`
  }

  get monthLabels () {
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
          isDisabled: !isEnabled
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
}
export default MonthPicker
</script>

<style lang="scss" scoped>
@import './month-picker.scss';
</style>
