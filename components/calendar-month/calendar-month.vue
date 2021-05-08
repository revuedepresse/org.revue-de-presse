<template>
  <table class="calendar-month">
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
</template>

<script>
import DateMixin from '../../mixins/date';

export default {
  name: "calendar-month",
  mixins: [DateMixin],
  props: {
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
  methods: {
    dateOfFirstVisibleDay() {
      let firstVisibleDayCandidate = this.nameOfFirstDayOfMonth();
      let dateCandidate = new Date(this.year, this.month, 1);

      while  (firstVisibleDayCandidate !== 'Lun.') {
        dateCandidate.setDate(dateCandidate.getDate() - 1);
        firstVisibleDayCandidate = this.whichDayOfWeek(dateCandidate.getDay());
      }

      return dateCandidate;
    },
    dateOfLastVisibleDay() {
      let lastVisibleDayCandidate = this.nameOfLastDayOfMonth();
      let dateCandidate = new Date(this.year, this.month, this.totalDaysInMonth());

      while  (lastVisibleDayCandidate !== 'Dim.') {
        dateCandidate.setDate(dateCandidate.getDate() + 1);
        lastVisibleDayCandidate = this.whichDayOfWeek(dateCandidate.getDay());
      }

      return dateCandidate;
    },
    daysOfWeek() {
      return ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
    },
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
      const dateOfFirstVisibleDay = this.dateOfFirstVisibleDay();
      let daysBeforeSelectedMonth = 0;
      if (dateOfFirstVisibleDay.getMonth() !== this.month) {
        daysBeforeSelectedMonth = this.totalDaysInPreviousMonth() - dateOfFirstVisibleDay.getDate() + 1;
      }

      const dateOfLastVisibleDay = this.dateOfLastVisibleDay();
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
    nameOfFirstDayOfMonth() {
      return this.daysOfWeek()[new Date(this.year, this.month, 1).getDay()]
    },
    nameOfLastDayOfMonth() {
      const lastDayNumberOfMonth = this.totalDaysInMonth();

      return this.whichDayOfWeek([new Date(this.year, this.month, lastDayNumberOfMonth).getDay()]);
    },
    totalDaysInMonth() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    totalDaysInPreviousMonth() {
      return new Date(this.year, this.month, 0).getDate();
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
    },
    whichDayOfWeek(dayNumber) {
      return this.daysOfWeek()[dayNumber];
    },
  }
}
</script>

<style lang="scss" scoped>
@import './calendar-month.scss';
</style>
