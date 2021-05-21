<template>
  <div class="scrollable-list">
    <ul :class="getListClasses()">
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
    },
    autoHeight: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getLabelClasses(item) {
      return {
        'scrollable-list__selectable-label': true,
        'scrollable-list__selectable-label--selected': item.isSelected,
        'scrollable-list__selectable-label--disabled': item.isDisabled,
      }
    },
    getListClasses() {
      return {
          "scrollable-list__list": true,
          "scrollable-list__list--auto": true,
      };
    }
  }
}
</script>

<style lang="scss" scoped>
@import './scrollable-list.scss';
</style>
