<template>
  <div ref="intro" class="intro">
    <div class="intro__container">
      <div class="intro__content-container">
        <div class="intro__arrow-up" />
        <a class="intro__close-intro">+</a>
        <p class="intro__content">
          Revue de presse est un projet citoyen indépendant
          qui s'adresse aux journalistes et à toute personne s'intéressant à l'actualité et à l'influence des médias sur l'opinion.<br>
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
import { Component, Vue } from 'nuxt-property-decorator'
import logo from '../../assets/revue-de-presse_100x100.png'

@Component
export default class Intro extends Vue {
  currentRoute: string = this.$router.currentRoute.path
  logo = logo
  height () {
    return this.$refs.intro.offsetHeight
  }
}
</script>

<style lang="scss" scoped>
@import './intro.scss';
</style>
