<template>
  <Highlights error-message="Désolé, cette adresse ne mène à aucun contenu. 😬">
  </Highlights>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Highlights from '../pages/highlight/_day.vue'
import ApiMixin from '../mixins/api'
import DateMixin from '../mixins/date'

@Component({
  components: {
    Highlights
  }
})
export default class NuxtError extends mixins(ApiMixin, DateMixin) {
  head () {
    const suffix = ' - Revue-de-presse.org 🦉'
    const description = 'Contenu introuvable'
    const title = `Contenu introuvable${suffix}`
    const url = 'https://revue-de-presse.org/contenu-introuvable'

    return {
      title,
      meta: [
        {
          content: description,
          hid: 'description',
          name: 'description'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: url
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        }
      ]
    }
  }
}
</script>

<style>
</style>
