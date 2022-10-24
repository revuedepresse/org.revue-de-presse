<template>
  <div>
    <HighlightList :show-media="areMediaVisible" />
    <ModalWindow />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HighlightList from '../components/highlight-list/highlight-list.vue'
import SharedState from '../modules/shared-state'
import ModalWindow from '../components/modal-window/modal-window.vue'

if (SharedState.isProductionModeActive()) {
  Vue.config.productionTip = false
}

@Component({
  components: { HighlightList, ModalWindow }
})
export default class Highlights extends Vue {
  get areMediaVisible() {
    return !this.$device.isMobile || !this.isBaselineView
  }

  get isBaselineView() {
    if (this.$route === undefined) {
      return true
    }

    const paramNames = Object.keys(this.$route.query);
    const isBaselineViewActive = paramNames.find((p) => p === 'naked') === undefined

    return this.$device.isDesktop || isBaselineViewActive
  }

  head() {
    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://revue-de-presse.org${this.$route.path}/`
        }
      ]
    };
  }
}
</script>

<style>
</style>
