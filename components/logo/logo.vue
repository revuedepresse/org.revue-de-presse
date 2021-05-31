<template>
  <div class="logo">
    <div class="logo__container">
      <div class="logo__logo-container">
        <a href="/">
          <img
            class="logo__logo"
            alt="Revue de Presse logo"
            width="48"
            height="48"
            :src="logo"
          >
        </a>
      </div>
    </div>
    <h1 class="logo__title">
      Revue de presse
    </h1>
  </div>
</template>

<script>
import logo from '../../assets/revue-de-presse-logo.svg'

export default {
  name: 'Logo',
  data () {
    return {
      currentRoute: this.$router.currentRoute.path,
      logo
    }
  }
}
</script>

<style lang="scss" scoped>
@import './logo.scss';
</style>
