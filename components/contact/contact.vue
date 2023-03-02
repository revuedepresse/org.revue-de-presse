<template>
  <div
    v-if="isShowingContactPage"
    class="contact"
  >
    <h1>Nous contacter</h1>
    <p>
      Il est possible de prendre contact avec nous à l'adresse suivante <br />
      <a :href="href" v-text="email"></a>
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
    return atob('bm91cy1jb250YWN0ZXJAcmV2dWUtZGUtcHJlc3NlLm9yZw==')
  }

  get href () {
    return `mailto:${atob('bm91cy1jb250YWN0ZXJAcmV2dWUtZGUtcHJlc3NlLm9yZw==')}`
  }
}

export default ContactPage
</script>

<style lang="scss" scoped>
@import 'contact';
</style>
