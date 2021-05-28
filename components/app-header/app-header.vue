<template>
  <div ref="header">
    <Logo />
    <Intro ref="intro" />
  </div>
</template>

<script>
import Logo from '../logo/logo.vue'
import Intro from '../intro/intro.vue'

export default {
  name: 'AppHeader',
  components: { Intro, Logo },
  methods: {
    height () {
      let height = 0

      if (this.$refs.intro) {
        height = this.$refs.intro.height()
      }

      return height
    }
  }
}
</script>

<style lang="scss" scoped>
@import './app-header.scss';
</style>
