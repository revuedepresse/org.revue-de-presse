<template>
  <div
    class="date-picker__buttons"
    :style="calendarIcon"
  >
    <div class="date-picker__container">
      <button
        class="date-picker"
        v-text="startDateLabel"
      />
    </div>

    <div class="date-picker__navigation">
      <button
        class="date-picker__previous-day"
        :style="previousDayIcon"
      />
      <button
        class="date-picker__next-day"
        :style="nextDayIcon"
      />
    </div>
  </div>
</template>

<script>
import calendardIcon from "~/assets/icons/icon-calendar-primary.svg";
import previousDayIcon from "~/assets/icons/icon-previous-day.svg";
import nextDayIcon from "~/assets/icons/icon-next-day.svg";

export default {
  name: "date-picker",
  props: {
    startDate: {
      type: String,
      required: true
    }
  },
  data() {
    const startDateLabel = this.refreshStartDateLabel(this.startDate);

    return {
      startDateLabel
    }
  },
  computed: {
    calendarIcon() {
      const widthOrHeight = '16px';

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
        --icon-previous-day-height: ${widthOrHeight};
        --icon-previous-day-width: ${widthOrHeight}
      `;
    },
    nextDayIcon() {
      const widthOrHeight = '32px';

      return `
        --icon-next-day-background: center / ${widthOrHeight} no-repeat url("${nextDayIcon}");
        --icon-next-day-height: ${widthOrHeight};
        --icon-next-day-width: ${widthOrHeight}
      `;
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import './date-picker.scss';
</style>
