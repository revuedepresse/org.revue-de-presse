<template>
  <div>
    <HighlightList :show-media="areMediaVisible" />
    <ModalWindow />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator'
import HighlightList from '../components/highlight-list/highlight-list.vue'
import SharedState from '../modules/shared-state'
import ModalWindow from '../components/modal-window/modal-window.vue'
import {Context} from "@nuxt/types";
import {now, setTimezone} from "~/mixins/date";

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
    let href

    if (this.$route.path[this.$route.path.length - 1] === '/') {
        href = `https://revue-de-presse.org${this.$route.path}`
          .replaceAll(new RegExp('/+'), '/')
    } else {
        href = `https://revue-de-presse.org${this.$route.path}/`
    }

    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href
        }
      ]
    };
  }

  validate(ctx: Context) {
    if (ctx.route.name === 'legal-notice') {
      return true;
    }

    const selectedDate = setTimezone(new Date(ctx.params.startDate))
    const greaterThanMinDate = setTimezone(new Date(Date.parse('01 Jan 2018 00:00:00 GMT'))) <= selectedDate
    const lesserThanMaxDate = selectedDate <= now()

    return greaterThanMinDate && lesserThanMaxDate
  }
}
</script>

<style>
</style>
