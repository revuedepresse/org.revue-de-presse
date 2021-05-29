<template>
  <div>
    <HighlightList :show-media="!$device.isMobile" />
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
export default class Highlights extends Vue {}
</script>

<style>
</style>
