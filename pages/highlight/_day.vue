<template>

  <div>
    <link rel="preconnect" :href="getApiHost" crossorigin>

    <div :class="daysClasses">

      <AppHeader
        ref="header"
        :is-baseline-view="isBaselineView"
        :picked-date="startDate"
      />

      <div
        class="_day__content">

        <div
          v-if="isBaselineView"
          class="_day__navigation">

          <DatePicker
            v-if="startDate"
            :start-date="startDate"
          />

          <Outro/>

        </div>

        <div
          ref="day"
          :class="containerClass"
        >

          <HighlightList
            :show-media="areMediaVisible"
            :end-date="endDate"
            :start-date="startDate"
            :items="items"
            :is-showing-legal-notice="isShowingLegalNotice"
            :is-baseline-view="isBaselineView"
          />

          <LoadingSpinner
            v-if="showLoadingSpinner"
            :message="errorMessage"
            :show-error-message="showErrorMessage"
            :show-loading-spinner="showLoadingSpinner"
          />

          <LegalNotice/>

        </div>

      </div>
    </div>

    <LazyModalWindow />

  </div>

</template>

<script lang="ts">
import {Component, mixins, Vue, Watch} from 'nuxt-property-decorator'
import {HeightAware} from '../../components/app-header/app-header.vue'
import AppHeader from '../../components/app-header/app-header.vue'
import DatePicker from '../../components/date-picker/date-picker.vue'
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.vue'
import LegalNotice from '../../components/legal-notice/legal-notice.vue'
import HighlightList from '../../components/highlight-list/highlight-list.vue'
import SharedState from '../../modules/shared-state'
import ModalWindow from '../../components/modal-window/modal-window.vue'
import Outro from '../../components/outro/outro.vue'
import {Context} from "@nuxt/types";
import DateMixin, {now, setTimezone} from "~/mixins/date";
import Config from "~/config";
import {RawStatus} from "~/mixins/status-format";
import ApiMixin from "~/mixins/api";
import EventHub from "~/modules/event-hub";

if (SharedState.isProductionModeActive()) {
  Vue.config.productionTip = false
}


const RETWEETS_EXCLUDED = 0
const RETWEETS_INCLUDED = 1

type Params = {
  endDate?: string,
  startDate?: string,
  pageIndex?: number,
  pageSize?: number,
  includeRetweets?: number,
  selectedAggregates?: number[],
  [key: string]: any
}

type RequestOptionsHeaders = Headers

type RequestOptions = {
  headers: RequestOptionsHeaders,
  params: Params
}

@Component({
  components: {
    AppHeader,
    DatePicker,
    LegalNotice,
    LoadingSpinner,
    HighlightList,
    ModalWindow,
    Outro
  }
})
export default class Highlights extends mixins(ApiMixin, DateMixin) {

  $refs!: {
    header: HeightAware,
    day: {
      offsetHeight: number
    },
    [key: string]: any
  }

  endDate: string = this.defaultDates().endDate

  startDate: string = this.defaultDates().startDate

  items: Array<{ status: RawStatus }> = []

  includeRetweets: number = RETWEETS_EXCLUDED

  logger = new SharedState.Logger()

  pageSize: number = 10

  selectedAggregates: number[] = []

  get areMediaVisible() {
    return !this.$device.isMobile || !this.isBaselineView
  }

  get containerClass() {
    const filledContainerClass = '_day__container _day__container--filled'
    const nonEmptyList = this.$nuxt.isOnline && this.items.length > 0

    if (nonEmptyList || this.$fetchState.pending) {
      return filledContainerClass
    }

    return '_day__container'
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

  get errorMessage() {
    return `Il semblerait qu'il n'y ait pas de contenu disponible pour cette date.`
  }

  async fetch() {
    const action = this.getHighlightsAction()
    const route = this.getHighlightsRoute()
    const requestOptions = this.getRequestOptions()

    const url = new URL(route)
    Object.keys(requestOptions.params).map((key: string) => {
      let param: string | null = requestOptions.params[key]
      if (param == null) {
        param = ''
      }

      return url.searchParams.set(key, param)
    })

    const response = await fetch(
      url.toString(),
      {
        method: action.method,
        headers: requestOptions.headers
      }
    )
      .then(res => res.json())
      .catch((_e) => {
        this.logger.error(
          // e.message, 'highlight-list', e
        )
      })

    this.items = response.statuses
  }

  getRequestOptions(params: Params = {}) {
    const authenticationToken = localStorage.getItem('x-auth-token')

    const requestHeaders: Headers = new Headers()
    requestHeaders.set('x-auth-token', authenticationToken || '')

    const requestOptions: RequestOptions = {
      headers: requestHeaders,
      params: {
        includeRetweets: RETWEETS_INCLUDED,
        startDate: this.startDate,
        endDate: this.startDate
      }
    }

    if (!this.showEndDate) {
      requestOptions.params.endDate = this.startDate
    }

    if (params.pageIndex) {
      requestOptions.params.pageIndex = params.pageIndex
    }

    if (this.pageSize > 0) {
      requestOptions.params.pageSize = this.pageSize
    }

    if (this.includeRetweets === RETWEETS_EXCLUDED) {
      requestOptions.params.includeRetweets = RETWEETS_EXCLUDED
    }

    if (this.selectedAggregates.length > 0) {
      requestOptions.params.selectedAggregates = this.selectedAggregates
    }

    return requestOptions
  }

  getHighlightsAction() {
    return this.routes.actions.fetchHighlights
  }

  getHighlightsRoute() {
    const action = this.getHighlightsAction()
    return `${Config.getSchemeAndHost()}${action.route}`
  }

  get isBaselineView() {
    if (this.$route === undefined) {
      return true
    }

    const paramNames = Object.keys(this.$route.query);
    const isBaselineViewActive = paramNames.find((p) => p === 'naked') === undefined

    return this.$device.isDesktop || isBaselineViewActive
  }

  get showEndDate() {
    return this.$route.name !== 'highlights'
  }

  get showErrorMessage(): boolean {
    return this.$fetchState.error !== null || this.items.length === 0
  }

  get showLoadingSpinner(): boolean {
    return this.$fetchState.pending
  }

  get isNotLegalNoticeRoute() {
    return !this.isShowingLegalNotice
  }

  get isShowingLegalNotice() {
    return this.$route.name === 'legal-notice'
  }

  get isLoadingSpinnerVisible() {
    if (this.isBaselineView && this.$device.isDesktop) {
      return this.items.length === 1
    }

    return this.items.length === 0
  }

  @Watch('startDate')
  onStartDateChange() {
    this.updateHighlights()
  }

  @Watch('endDate')
  onEndDateChange() {
    this.updateHighlights()
  }

  @Watch('includeRetweets')
  onIncludeRetweetsChange() {
    this.updateHighlights()
  }

  destroyed() {
    EventHub.$off('_day.reload_intended')
  }

  created() {
    EventHub.$off('_day.reload_intended')
    EventHub.$on('_day.reload_intended', this.fetchHighlights)

    this.fetchHighlights()
  }

  fetchHighlights() {
    this.$fetch()
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

  updateHighlights() {
    this.items = []
    const day = this.startDate

    this.$router.push({
      path: `/${day}`
    })
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
