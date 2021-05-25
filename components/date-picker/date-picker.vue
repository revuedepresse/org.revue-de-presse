<template>
  <div class="date-picker">
    <div class="date-picker__pickers">
      <year-picker
        :year="startDateYear"
        :is-next-item-available="isNextYearAvailable()"
        :is-previous-item-available="isPreviousYearAvailable()"
      />
      <month-picker
        :month="startDateMonth"
        :year="startDateYear"
        :is-next-item-available="isNextMonthAvailable()"
        :is-previous-item-available="isPreviousMonthAvailable()"
        :visible-days-interval="visibleDaysInterval()"
      />
      <calendar-month
        :month="startDateMonth"
        :year="startDateYear"
        :is-next-item-available="isNextDayAvailable()"
        :is-previous-item-available="isPreviousDayAvailable()"
      />
    </div>
    <div
      class="date-picker__buttons"
      :style="calendarIcon"
    >
      <div
        :class="datePickerClasses()"
        :data-disabled="disabled"
        @click="pickDate()"
        @mouseout="releaseDate()"
      >
        <button
          class="date-picker__button"
          v-text="startDateLabel"
          :disabled="disabled"
        />
      </div>

      <div class="date-picker__navigation">
        <button
          :class="getPreviousDayClasses()"
          :style="previousDayIcon"
        />
        <button
          :class="getNextDayClasses()"
          :style="nextDayIcon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import calendardIcon from "~/assets/icons/icon-calendar-primary.svg";
import previousDayIcon from "~/assets/icons/icon-previous-day.svg";
import previousDayActiveIcon from "~/assets/icons/icon-previous-day-active.png";
import previousDayHoverIcon from "~/assets/icons/icon-previous-day-hover.png";
import nextDayIcon from "~/assets/icons/icon-next-day.svg";
import nextDayActiveIcon from "~/assets/icons/icon-next-day-active.png";
import nextDayHoverIcon from "~/assets/icons/icon-next-day-hover.png";
import CalendarMonth from "../calendar-month/calendar-month.vue";
import MonthPicker from "../month-picker/month-picker.vue";
import YearPicker from "../year-picker/year-picker.vue";
import DateMixin from '../../mixins/date';

export default {
  name: "date-picker",
  components: { CalendarMonth, MonthPicker, YearPicker },
  mixins: [DateMixin],
  props: {
    startDate: {
      type: String,
      required: true
    }
  },
  data() {
    const startDateLabel = this.refreshStartDateLabel(this.startDate);
    const pickedDate = false;

    return {
      startDateLabel,
      disabled: false,
      pickedDate
    }
  },
  computed: {
    calendarIcon() {
      const widthOrHeight = '20px';

      return `
        --icon-calendar-background: center / ${widthOrHeight} no-repeat url("${calendardIcon}");
        --icon-calendar-height: ${widthOrHeight};
        --icon-calendar-width: ${widthOrHeight}
      `;
    },
    previousDayIcon() {
      const widthOrHeight = '32px';

      return `
        --icon-previous-day-background: center / ${widthOrHeight} no-repeat url("${previousDayIcon}");
        --icon-previous-day-background-active: center / ${widthOrHeight} no-repeat url("${previousDayActiveIcon}");
        --icon-previous-day-background-hover: center / ${widthOrHeight} no-repeat url("${previousDayHoverIcon}");
        --icon-previous-day-height: ${widthOrHeight};
        --icon-previous-day-width: ${widthOrHeight}
      `;
    },
    nextDayIcon() {
      const widthOrHeight = '32px';

      return `
        --icon-next-day-background: center / ${widthOrHeight} no-repeat url("${nextDayIcon}");
        --icon-next-day-background-active: center / ${widthOrHeight} no-repeat url("${nextDayActiveIcon}");
        --icon-next-day-background-hover: center / ${widthOrHeight} no-repeat url("${nextDayHoverIcon}");
        --icon-next-day-height: ${widthOrHeight};
        --icon-next-day-width: ${widthOrHeight}
      `;
    },
    startDateMonth() {
      return this.getStartDateMonth(this.startDate);
    },
    startDateYear() {
      return this.getStartDateYear(this.startDate);
    },
    month() {
      return this.startDateMonth;
    },
    year() {
      return this.startDateYear;
    }
  },
  methods: {
    getNextDayClasses() {
      return {
        'date-picker__next-day': true,
        'date-picker__next-day--disabled': !this.isNextDayAvailable(),
      }
    },
    getPreviousDayClasses() {
      return {
        'date-picker__previous-day': true,
        'date-picker__previous-day--disabled': !this.isPreviousDayAvailable(),
      }
    },
    isNextDayAvailable() {
      const today = new Date();
      const sinceDate = new Date(this.startDate);

      if (
        sinceDate.getFullYear() >= 2018 &&
        sinceDate.getFullYear() < today.getFullYear()) {
        return true;
      }

      if (sinceDate.getFullYear() < 2018) {
        if (sinceDate.getMonth() < 11) {
          return false;
        }

        return sinceDate.getDate() === 31;
      }

      if (sinceDate.getMonth() < today.getMonth()) {
        return true;
      }

      if (sinceDate.getMonth() > today.getMonth()) {
        return false;
      }

      return sinceDate.getDate() < today.getDate();
    },
    isPreviousDayAvailable() {
      const today = new Date();
      const sinceDate = new Date(this.startDate);

      if (sinceDate.getFullYear() < 2018) {
        return false;
      }

      if (sinceDate.getFullYear() === today.getFullYear()) {
        if (sinceDate.getMonth() < today.getMonth()) {
          return true;
        }

        return sinceDate.getDate() <= today.getDate() + 1;
      }

      if (
        sinceDate.getFullYear() > 2018 &&
        sinceDate.getFullYear() < today.getFullYear()) {
        return true;
      }

      if (sinceDate.getMonth() > 0) {
        return true;
      }

      return sinceDate.getDate() > 1;
    },
    isNextYearAvailable() {
      const today = new Date();

      return this.startDateYear >= 2017 && this.startDateYear < today.getFullYear();
    },
    isPreviousYearAvailable() {
      const today = new Date();

      return this.startDateYear > 2018 && this.startDateYear <= today.getFullYear() + 1;
    },
    isNextMonthAvailable() {
      const today = new Date();

      if (this.startDateYear >= 2018 && this.startDateYear < today.getFullYear()) {
        // The next month belongs to
        // a year before or equal to
        // the year following the current one
        return true;
      }

      // The next month is before or equal
      // to the current month
      return this.startDateMonth + 1 <= today.getMonth();
    },
    isPreviousMonthAvailable() {
      const today = new Date();

      if (this.startDateYear > 2018 && this.startDateYear <= today.getFullYear()) {
        return true;
      }

      // January 2018 is the earliest available month
      return this.startDateMonth > 1;
    },
    pickDate(event) {
      this.pickedDate = true;

      return false;
    },
    releaseDate(event) {
      this.pickedDate = false;

      return false;
    },
    datePickerClasses() {
      return {
        'date-picker__container': true,
        'date-picker__container--active': this.pickedDate,
      }
    },
    getStartDateMonth(startDate) {
      const date = new Date(startDate);

      return date.getMonth();
    },
    getStartDateYear(startDate) {
      const date = new Date(startDate);

      return date.getFullYear();
    },
    refreshStartDateLabel(startDate) {
      const date = new Date(startDate);
      const dayOfMonth = date.getDate();
      const daysOfWeek = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
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
      ];
      const dayOfWeek = daysOfWeek[date.getDay()];
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
    },
    visibleDaysInterval() {
      return {
        start: new Date(this.getMinDate()),
        end: new Date(this.getMaxDate()),
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import './date-picker.scss';
</style>
