<template>
  <div ref="header">
    <Logo />
    <Intro ref="intro" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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
