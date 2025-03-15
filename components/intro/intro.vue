<template>
  <div
    v-if="isIntroVisible"
    ref="intro"
    class="intro"
  >
    <div class="intro__container">
      <div class="intro__content-container">
        <div class="intro__arrow-up" />
        <a
          class="intro__close-intro"
          @click="hideIntro"
        >+</a>
        <p class="intro__content">
          {{ projectDescription }}<br>
          <a
            :href="currentRoute + '#project'"
            class="intro__footer-anchor underline"
          >En savoir plus</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Contents from '../../assets/contents.json'
import logo from '../../assets/revue-de-presse_100x100.png'

@Component
export default class Intro extends Vue {
  $refs!: {
    intro: {offsetHeight: number},
    [key: string]: any
  }

  @Prop({
    type: Boolean,
    default: true
  })
    isBaselineView!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
    showIntro = false

  isIntroVisible = true

  currentRoute: string = this.$router.currentRoute.path
  logo = logo

  get projectDescription (): string {
    return Contents.description
  }

  height () {
    return this.$refs.intro.offsetHeight
  }

  hideIntro () {
    this.isIntroVisible = false
    this.$cookies.set('hideIntro', 1)
  }

  mounted () {
    if (this.$cookies.get('hideIntro') === 1 || !this.isBaselineView) {
      this.isIntroVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import './intro.scss';
</style>
