<template>
  <div
    v-if="isShowingContactPage"
    class="contact"
  >
    <h1>Nous contacter</h1>
    <p>
      Il est possible de prendre contact avec nous à l'adresse suivante&nbsp;:<br />
      <a
        :href="href"
        class="contact__email"
      >
        {{ email }}
      </a>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
class ContactPage extends Vue {
  get isShowingContactPage () {
    return this.$route.name === 'contact'
  }

  get email () {
    return atob('Y29udGFjdEByZXZ1ZS1kZS1wcmVzc2Uub3Jn')
  }

  get href () {
    return `mailto:${this.email}`
  }
}

export default ContactPage
</script>

<style lang="scss" scoped>
@import 'contact';
</style>
