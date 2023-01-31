<template>
  <div
    ref="header"
    class="app-header"
  >
    <div class="app-header__container">
      <Logo />
    </div>
    <p
      v-if="!isBaselineView"
      class="app-header__popular-news"
      v-text="popularNews"
    />
    <Intro
      v-if="$device.isMobile"
      ref="intro"
      :is-baseline-view="isBaselineView"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Logo from '../logo/logo.vue'
import Intro from '../intro/intro.vue'

interface HeightAware {
  height: () => number
}

@Component({
  components: { Intro, Logo }
})
class AppHeader extends Vue implements HeightAware {
  $refs!: {
    intro: any
  }

  @Prop({
    type: Boolean,
    default: true
  })
    isBaselineView!: boolean

  @Prop({
    type: String,
    required: true
  })
    pickedDate!: string

  get popularNews () {
    return `
      Les 3 actus les + relayées le ${this.pickedDate}
`
  }

  height () {
    let height = 0

    if (this.$refs.intro) {
      height = this.$refs.intro.height()
    }

    return height
  }
}

export { HeightAware }

export default AppHeader
</script>

<style lang="scss" scoped>
@import './app-header.scss';
</style>
