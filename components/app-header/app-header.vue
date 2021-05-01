<template>
  <div ref="header">
    <logo />
    <intro ref="intro" />
  </div>
</template>

<script>
import Logo from '../logo/logo.vue';
import Intro from '../intro/intro.vue';

export default {
  name: 'app-header',
  components: { Intro, Logo },
  methods: {
    height() {
      let height = 0;

      if (this.$refs.intro) {
        height = this.$refs.intro.height();
      }

      return height;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './app-header.scss';
</style>
