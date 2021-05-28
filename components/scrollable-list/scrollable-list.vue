<template>
  <div class="scrollable-list">
    <ul :class="getListClasses()">
      <li
        v-for="item in items"
        :key="item.index"
        class="scrollable-list__list-item"
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
          >
          {{ item.label }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

type Item = {
  isDisabled: boolean,
  isSelected: boolean,
  index: number,
}

@Component
class ScrollableList extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  items!: Item

  @Prop({
    type: Number,
    required: true
  })
  selected!: number

  @Prop({
    type: Boolean,
    default: false
  })
  autoHeight!: boolean

  getLabelClasses (item: Item) {
    return {
      'scrollable-list__selectable-label': true,
      'scrollable-list__selectable-label--selected': item.isSelected,
      'scrollable-list__selectable-label--disabled': item.isDisabled
    }
  }

  getListClasses () {
    return {
      'scrollable-list__list': true,
      'scrollable-list__list--auto': true
    }
  }
}

export { Item }
export default ScrollableList
</script>

<style lang="scss" scoped>
@import './scrollable-list.scss';
</style>
