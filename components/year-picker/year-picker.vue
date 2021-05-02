<template>
  <div class="year-picker">
  </div>
</template>

<script>
import pickItemIcon from "~/assets/icons/icon-pick-item.svg";

export default {
  name: "year-picker",
  props: {
    startDate: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './year-picker.scss';
</style>
