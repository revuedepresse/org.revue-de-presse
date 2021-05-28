<template>
  <div>
    <HighlistList :show-media="!$device.isMobile" />
    <ModalWindow />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HighlistList from '../components/highlight-list/highlight-list.vue'
import SharedState from '../modules/shared-state'
import ModalWindow from '~/components/modal-window/modal-window.vue'

if (SharedState.isProductionModeActive()) {
  Vue.config.productionTip = false
}

export default Vue.extend({
  components: {
    HighlistList,
    ModalWindow
  }
})
</script>

<style>
</style>
