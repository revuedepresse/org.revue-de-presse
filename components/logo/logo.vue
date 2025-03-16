<template>
  <div class="logo">
    <div class="logo__container">
      <div class="logo__logo-container">
        <a :href="homepagePath">
          <img
            class="logo__logo"
            alt="logo de Revue de Presse"
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

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import ApiMixin from '~/mixins/api'
import Logotype from '~/assets/revue-de-presse-logo.svg?data'

@Component
export default class Logo extends ApiMixin {
  get logo () {
    return Logotype
  }
}
</script>

<style lang="scss" scoped>
@import './logo.scss';
</style>
