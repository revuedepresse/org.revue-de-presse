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
    <scrollable-list
      class="year-picker__scrollable-list"
      :items="acceptedYearLabels"
      :selected="this.year"
    />
  </div>
</template>

<script>
import previousItemIcon from "~/assets/icons/icon-previous-item.png";
import nextItemIcon from "~/assets/icons/icon-next-item.png";
import ScrollableList from '../scrollable-list/scrollable-list.vue';

export default {
  name: "year-picker",
  components: { ScrollableList },
  props: {
    year: {
      type: Number,
      required: true
    },
    isNextItemAvailable: {
      type: Boolean,
      default: false
    },
    isPreviousItemAvailable: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    acceptedYearLabels() {
      const today = new Date()
      const years = new Array(today.getFullYear() - 2018);
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
      );

      return acceptedYears;
    },
    previousItemIcon() {
      const widthOrHeight = '32px';

      return `
        --icon-previous-item-background: center / ${widthOrHeight} no-repeat url("${previousItemIcon}");
        --icon-previous-item-height: ${widthOrHeight};
        --icon-previous-item-width: ${widthOrHeight}
      `;
    },
    nextItemIcon() {
      const widthOrHeight = '32px';

      return `
        --icon-next-item-background: center / ${widthOrHeight} no-repeat url("${nextItemIcon}");
        --icon-next-item-height: ${widthOrHeight};
        --icon-next-item-width: ${widthOrHeight}
      `;
    },
  },
  methods: {
    getNextItemClasses() {
      return {
        'year-picker__next-item': true,
        'year-picker__next-item--disabled': !this.isNextItemAvailable,
      }
    },
    getPreviousItemClasses() {
      return {
        'year-picker__previous-item': true,
        'year-picker__previous-item--disabled': !this.isPreviousItemAvailable,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './year-picker.scss';
</style>
