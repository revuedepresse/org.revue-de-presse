<template>
  <div class="calendar-month">
    <div
      class="calendar-month__buttons"
      :style="pickItemIcon"
    >
      <div class="calendar-month__container">
        <button
          class="calendar-month__button"
          v-text="monthYearLabel"
        />
      </div>
      <div class="calendar-month__navigation">
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
    <table class="calendar-month__days">
      <thead class="calendar-month__day-names">
        <tr class="calendar-month__day-row">
          <th
            class="calendar-month__day-col"
            v-for="(day, dayIndex) in days"
            :key="dayIndex"
          >
            <span
              class="calendar-month__day-name"
              v-text="day"
            ></span>
          </th>
        </tr>
      </thead>
      <tbody class="calendar-month__day-numbers">
        <tr
          class="calendar-month__day-row"
          v-for="(rowNumber, rowIndex) in dayRows()"
          :key="rowIndex"
        >
          <td
            :class="weekDayClasses(weekDay)"
            v-for="(weekDay, dayPos) in dayNumbers(rowNumber)"
            :key="dayPos"
          >
            <a
              class="calendar-month__day-cell"
              v-text="weekDay.getDate()"
            >
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DateMixin from '../../mixins/date';
import pickItemIcon from "~/assets/icons/icon-pick-item.svg";
import previousItemIcon from "~/assets/icons/icon-previous-item.png";
import nextItemIcon from "~/assets/icons/icon-next-item.png";

export default {
  name: "calendar-month",
  mixins: [DateMixin],
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
    year: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      days: ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.']
    }
  },
  computed: {
    previousItemIcon() {
      const widthOrHeight = '32px';

    console.log(previousItemIcon);

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
    monthYearLabel() {
      return `${this.getMonths[this.month]} ${this.year}`;
    },
    pickItemIcon() {
      const widthOrHeight = '20px';

      return `
        --icon-pick-item-background: center / ${widthOrHeight} no-repeat url("${pickItemIcon}");
        --icon-pick-item-height: ${widthOrHeight};
        --icon-pick-item-width: ${widthOrHeight}
      `;
    },
  },
  methods: {
    dayNumbers(rowNumber) {
      const shift = (rowNumber - 1) * 7

      const week = (new Array(7))
        .fill('', 0, 7)
        .map((_, index) => {
          const dayOfWeek = new Date(this.dateOfFirstVisibleDay().getTime());
          dayOfWeek.setDate(dayOfWeek.getDate() + index + shift);
          return dayOfWeek;
        })

      return week;
    },
    dayRows() {
      let dateOfFirstVisibleDay;

      try {
        dateOfFirstVisibleDay = this.dateOfFirstVisibleDay();
      } catch (e) {
        return;
      }

      let daysBeforeSelectedMonth = 0;
      if (dateOfFirstVisibleDay.getMonth() !== this.month) {
        daysBeforeSelectedMonth = this.totalDaysInPreviousMonth() - dateOfFirstVisibleDay.getDate() + 1;
      }

      let dateOfLastVisibleDay;

      try {
        dateOfLastVisibleDay = this.dateOfLastVisibleDay();
      } catch (e) {
        return;
      }

      let daysAfterSelectedMonth = 0;
      if (dateOfLastVisibleDay.getMonth() !== this.month) {
        daysAfterSelectedMonth = dateOfLastVisibleDay.getDate();
      }

      return (
        daysBeforeSelectedMonth
        + this.totalDaysInMonth()
        + daysAfterSelectedMonth
      ) / 7;
    },
    getNextItemClasses() {
      return {
        'calendar-month__next-item': true,
        'calendar-month__next-item--disabled': !this.isNextItemAvailable,
      }
    },
    getPreviousItemClasses() {
      return {
        'calendar-month__previous-item': true,
        'calendar-month__previous-item--disabled': !this.isPreviousItemAvailable,
      }
    },
    weekDayClasses(weekDay) {
      const defaultClass = 'calendar-month__day-number';

      if (!weekDay instanceof Date) {
        return {
          [defaultClass]: true
        };
      }

      return {
        [defaultClass]: true,
        'calendar-month__day-number--other-month': weekDay.getMonth() !== this.month,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './calendar-month.scss';
</style>
