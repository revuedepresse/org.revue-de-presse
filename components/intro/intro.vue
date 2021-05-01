<template>
  <div class="intro">
    <div class="intro__container">
      <div class="intro__content-container">
        <div class="intro__arrow-up"></div>
        <a class="intro__close-intro">+</a>
        <p class="intro__content">Revue de presse est un projet citoyen indépendant
          qui s'adresse aux journalistes et à toute personne s'intéressant à l'actualité et à l'influence des médias sur l'opinion.<br />
          <a
            :href="currentRoute + '#project'"
            class="intro__footer-anchor underline">En savoir plus</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../../assets/revue-de-presse_100x100.png";

export default {
  name: "intro",
  data() {
    return {
      currentRoute: this.$router.currentRoute.path,
      logo
    }
  }
}
</script>

<style lang="scss" scoped>
@import './intro.scss';
</style>
