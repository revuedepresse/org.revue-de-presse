<template>
</template>

<script lang="ts">
import Vue from 'vue'
import Time from "~/modules/time";

export default Vue.extend({
  middleware({ redirect, route }) {
    if (route.name !== 'highlight') {
      return redirect(`/highlights/${Time.today()}`)
    }
  }
})
</script>

<style>
</style>
