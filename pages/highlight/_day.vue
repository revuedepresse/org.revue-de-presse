<template>

  <div>
    <link rel="preconnect" :href="getApiHost" crossorigin>

    <div :class="daysClasses">

      <AppHeader
        ref="header"
        :is-baseline-view="isBaselineView"
        :picked-date="startDate"
      />

      <HighlightList
        :show-media="areMediaVisible"
        :end-date="endDate"
        :start-date="startDate"
      />

    </div>

    <ModalWindow />

  </div>

</template>

<script lang="ts">
import {Component, mixins, Vue} from 'nuxt-property-decorator'
import {HeightAware} from '../../components/app-header/app-header.vue'
import AppHeader from '../../components/app-header/app-header.vue'
import HighlightList from '../../components/highlight-list/highlight-list.vue'
import SharedState from '../../modules/shared-state'
import ModalWindow from '../../components/modal-window/modal-window.vue'
import {Context} from "@nuxt/types";
import DateMixin, {now, setTimezone} from "~/mixins/date";
import Config from "~/config";

if (SharedState.isProductionModeActive()) {
  Vue.config.productionTip = false
}

@Component({
  components: {
    AppHeader,
    HighlightList,
    ModalWindow
  }
})
export default class Highlights extends mixins(DateMixin) {
  endDate: string = this.defaultDates().endDate
  startDate: string = this.defaultDates().startDate

  $refs!: {
    header: HeightAware,
    [key: string]: any
  }

  get areMediaVisible() {
    return !this.$device.isMobile || !this.isBaselineView
  }

  get getApiHost() {
    return Config.getSchemeAndHost()
  }

  get daysClasses() {
    return {
      '_day': true,
      '_day--naked': !this.isBaselineView,
      list: true
    }
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
          .replaceAll(new RegExp('/+$', 'g'), '')
    } else {
        href = `https://revue-de-presse.org${this.$route.path}`
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

    if (ctx.route.name === 'curated-highlights' && ctx.route.path.endsWith('/')) {
      return false
    }

    const selectedDate = setTimezone(new Date(ctx.params.day))
    const greaterThanMinDate = setTimezone(new Date(Date.parse('01 Jan 2018 00:00:00 GMT'))) <= selectedDate
    const lesserThanMaxDate = selectedDate <= now()

    return greaterThanMinDate && lesserThanMaxDate
  }
}
</script>

<style lang="scss" scoped>
@import './_day.scss';
</style>
