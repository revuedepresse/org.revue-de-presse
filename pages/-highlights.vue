<template>
  <div>
    <HighlistList :show-media="!$device.isMobile" />
    <ModalWindow />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HighlistList from '../components/highlight-list/highlight-list.vue'
import SharedState from '../modules/shared-state'
import ModalWindow from '~/components/modal-window/modal-window.vue'

if (SharedState.isProductionModeActive()) {
  Vue.config.productionTip = false
}

@Component({
  components: {
    HighlistList,
    ModalWindow
  }
}) class Highlights extends Vue {}

export default Highlights
</script>

<style>
</style>
