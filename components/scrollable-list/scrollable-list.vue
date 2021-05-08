<template>
  <div class="scrollable-list">
    <ul class="scrollable-list__list">
      <li
        class="scrollable-list__list-item"
        v-for="(item, index) in items"
      >
        <label
          :class="getLabelClasses(item)"
          for="selectable"
        >
          <input
            class="scrollable-list__selectable"
            type="radio"
            name="selectable"
            :disabled="item.isDisabled"
            :value="item.index"
            :checked="item.isSelected"
          />
          {{ item.label }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "scrollable-list",
  props: {
    items: {
      type: Array,
      required: true
    },
    selected: {
      type: Number,
      required: true
    }
  },
  methods: {
    getLabelClasses(item) {
      return {
        'scrollable-list__selectable-label': true,
        'scrollable-list__selectable-label--selected': item.isSelected,
        'scrollable-list__selectable-label--disabled': item.isDisabled,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './scrollable-list.scss';
</style>
