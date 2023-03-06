<template>
  <div class="scrollable-list">
    <ul ref="list" :class="getListClasses()">
      <li
        v-for="item in items"
        :key="item.index"
        class="scrollable-list__list-item"
        :data-checked="item.isSelected"
      >
        <label
          :class="getLabelClasses(item)"
          for="selectable"
          @click.stop.prevent="handleClick(item)"
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
  onClick: () => void
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

  $refs!: {
    list: HTMLElement,
    [key: string]: any
  }

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

  handleClick (item: {[key: string]: any}) {
    if (item.onClick instanceof Function) {
      item.onClick()
    }
  }

  scrollIntoView () {
    const selectedItem: HTMLElement|null = this.$refs.list.querySelector(
      '[data-checked]'
    )

    if (selectedItem === null) {
      return
    }

    selectedItem.scrollIntoView({ block: 'center' })
  }

  mounted () {
    this.scrollIntoView()
  }

  updated () {
    this.scrollIntoView()
  }
}

export { Item }
export default ScrollableList
</script>

<style lang="scss" scoped>
@import './scrollable-list.scss';
</style>
