<template>
  <div class="month-picker">
    <div
      class="month-picker__buttons"
      :style="pickItemIcon"
    >
      <div class="month-picker__container">
        <button
          class="month-picker__button"
          v-text="monthYearLabel"
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
  </div>
</template>

<script>
import pickItemIcon from "~/assets/icons/icon-pick-item.svg";
import previousItemIcon from "~/assets/icons/icon-previous-item.png";
import nextItemIcon from "~/assets/icons/icon-next-item.png";

export default {
  name: "month-picker",
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
  },
  computed: {
    monthYearLabel() {
      return `${this.getMonths()[this.month]} ${this.year}`;
    },
    pickItemIcon() {
      const widthOrHeight = '20px';

      return `
        --icon-pick-item-background: center / ${widthOrHeight} no-repeat url("${pickItemIcon}");
        --icon-pick-item-height: ${widthOrHeight};
        --icon-pick-item-width: ${widthOrHeight}
      `;
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
    }
  },
  methods: {
    getNextItemClasses() {
      return {
        'month-picker__next-item': true,
        'month-picker__next-item--disabled': !this.isNextItemAvailable,
      }
    },
    getPreviousItemClasses() {
      return {
        'month-picker__previous-item': true,
        'month-picker__previous-item--disabled': !this.isPreviousItemAvailable,
      }
    },
    getMonths() {
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
        'Décembre',
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import './month-picker.scss';
</style>
