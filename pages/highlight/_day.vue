<template>
  <div>
    <link rel="preconnect" :href="getApiHost" crossorigin>
    <slot></slot>
    <div :class="daysClasses">
      <AppHeader
        ref="header"
        :is-baseline-view="isBaselineView"
        :picked-date="startDate"
      />
      <div class="_day__content">
        <div
          ref="day"
          :class="containerClass"
        >
          <HighlightList
            :show-media="areMediaVisible"
            :end-date="endDate"
            :start-date="startDate"
            :items="items"
            :is-showing-another-page="isShowingAnotherPage"
            :is-baseline-view="isBaselineView"
          />
          <LoadingSpinner
            v-if="showLoadingSpinnerComponent"
            :message="errorMessage"
            :show-error-message="showErrorMessage"
            :show-loading-spinner="showLoadingSpinner"
          />
          <LegalNotice />
          <Contact />
          <Sources />
        </div>
        <div
          v-if="isBaselineView"
          class="_day__navigation"
        >
          <DatePicker
            v-if="startDate"
            :start-date="startDate"
          />
          <Outro />
        </div>
      </div>
    </div>
    <LazyModalWindow />
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins, Vue, Watch } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

import AppHeader, { HeightAware } from '../../components/app-header/app-header.vue'
import Contact from '../../components/contact/contact.vue'
import DatePicker from '../../components/date-picker/date-picker.vue'
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.vue'
import LegalNotice from '../../components/legal-notice/legal-notice.vue'
import HighlightList from '../../components/highlight-list/highlight-list.vue'
import SharedState from '../../modules/shared-state'
import ModalWindow from '../../components/modal-window/modal-window.vue'
import Sources from '../../components/sources/sources.vue'
import Outro from '../../components/outro/outro.vue'
import DateMixin, { getMinDate, isValidDate, now, setTimezone } from '../../mixins/date'
import Config from '../../config'
import { RawStatus } from '../../mixins/status-format'
import ApiMixin from '../../mixins/api'
import EventHub from '../../modules/event-hub'
import Time from '../../modules/time'

if (SharedState.isProductionModeActive()) {
  Vue.config.productionTip = false
}

const MEDIA_INCLUDED = 0
const MEDIA_EXCLUDED = 1

const RETWEETS_EXCLUDED = 0
const RETWEETS_INCLUDED = 1

type Params = {
  endDate?: string,
  startDate?: string,
  pageIndex?: number,
  pageSize?: number,
  includeRetweets?: number,
  excludeMedia?: number
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
    Contact,
    DatePicker,
    LegalNotice,
    LoadingSpinner,
    HighlightList,
    ModalWindow,
    Outro,
    Sources
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

  @Prop({
    type: String,
    default: 'Désolé, cette adresse ne mène à aucun contenu. 😬'
  })
    errorMessage!: string

  endDate: string = this.defaultDates().endDate

  startDate: string = this.defaultDates().startDate

  items: Array<{ status: RawStatus }> = []

  includeRetweets: number = RETWEETS_EXCLUDED

  logger = new SharedState.Logger()

  pageSize = 10

  selectedAggregates: number[] = []

  get areMediaVisible () {
    return !this.$device.isMobile || !this.isBaselineView
  }

  get containerClass () {
    const filledContainerClass = '_day__container _day__container--filled'
    const nonEmptyList = this.$nuxt.isOnline && this.items.length > 0

    if (nonEmptyList || (this.$fetchState && this.$fetchState.pending)) {
      return filledContainerClass
    }

    return '_day__container'
  }

  get getApiHost () {
    return Config.getSchemeAndHost()
  }

  get daysClasses () {
    return {
      _day: true,
      list: true,
      '_day--naked': !this.isBaselineView
    }
  }

  async fetch () {
    const action = this.getHighlightsAction()
    const curatedHighlightsRoute = this.getHighlightsRoute()
    const requestOptions = this.getRequestOptions()

    const url = new URL(curatedHighlightsRoute)
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

  getRequestOptions (params: Params = {}) {
    const authenticationToken = localStorage.getItem('x-auth-token')

    const requestHeaders: Headers = new Headers()
    requestHeaders.set('x-auth-token', authenticationToken || '')

    const requestOptions: RequestOptions = {
      headers: requestHeaders,
      params: {
        includeRetweets: RETWEETS_INCLUDED,
        excludeMedia: MEDIA_INCLUDED,
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

    if (!this.$device.isDesktop) {
      requestOptions.params.excludeMedia = MEDIA_EXCLUDED
    }

    if (this.selectedAggregates.length > 0) {
      requestOptions.params.selectedAggregates = this.selectedAggregates
    }

    return requestOptions
  }

  getHighlightsAction () {
    return this.routes.actions.fetchHighlights
  }

  getHighlightsRoute () {
    const action = this.getHighlightsAction()
    return `${Config.getSchemeAndHost()}${action.route}`
  }

  get isBaselineView () {
    if (this.$route === undefined) {
      return true
    }

    const paramNames = Object.keys(this.$route.query)
    const isBaselineViewActive = paramNames.find(p => p === 'naked') === undefined

    return this.$device.isDesktop || isBaselineViewActive
  }

  get showEndDate () {
    return this.$route.name !== 'highlights'
  }

  get showingNotFoundPage () {
    return this.$route.name === 'not-found'
  }

  get showErrorMessage (): boolean {
    if (
      this.showingContactPage ||
      this.showingLegalNoticePage ||
      this.showingHomepage ||
      this.showingSourcesPage ||
      this.showingSourcePage
    ) {
      return false
    }

    return this.showingNotFoundPage ||
      !this.validCuratedHighlightsDay ||
      (this.$fetchState !== undefined && this.$fetchState.error !== null) ||
      this.items.length === 0
  }

  get showLoadingSpinner () {
    return this.showLoadingSpinnerComponent &&
      !this.showingNotFoundPage &&
      this.validCuratedHighlightsDay
  }

  get showLoadingSpinnerComponent (): boolean {
    if (this.$route.name === 'curated-highlights') {
      return !this.validCuratedHighlightsDay
    }

    if (this.isShowingAnotherPage) {
      return false
    }

    if (this.showingNotFoundPage) {
      return true
    }

    if (this.$fetchState === undefined) {
      return true
    }

    return this.$fetchState.pending
  }

  get showingHomepage () {
    return this.$route.name === 'homepage'
  }

  get showingContactPage () {
    return this.$route.name === 'contact'
  }

  get showingLegalNoticePage () {
    return this.$route.name === 'legal-notice'
  }

  get showingSourcesPage () {
    return this.$route.name === 'sources'
  }

  get showingSourcePage () {
    return this.$route.name === 'source'
  }

  get validCuratedHighlightsDay () {
    if (this.$route.name !== 'curated-highlights') {
      return false
    }

    return this.isValidDate(this.$route.params.day) &&
      setTimezone(new Date(this.$route.params.day)) <= now() &&
      setTimezone(new Date(this.$route.params.day)) >= setTimezone(getMinDate())
  }

  get isShowingAnotherPage (): boolean {
    if (this.$route.name === 'curated-highlights') {
      return !this.validCuratedHighlightsDay
    }

    return this.showingLegalNoticePage ||
      this.showingContactPage ||
      this.showingSourcePage ||
      this.showingSourcesPage ||
      this.showingNotFoundPage ||
      this.$route.name === 'source'
  }

  get isLoadingSpinnerVisible () {
    if (this.isBaselineView && this.$device.isDesktop) {
      return this.items.length === 1
    }

    return this.items.length === 0
  }

  @Watch('startDate')
  onStartDateChange () {
    this.updateHighlights()
  }

  @Watch('endDate')
  onEndDateChange () {
    this.updateHighlights()
  }

  @Watch('includeRetweets')
  onIncludeRetweetsChange () {
    this.updateHighlights()
  }

  destroyed () {
    EventHub.$off('_day.reload_intended')
  }

  created () {
    EventHub.$off('_day.reload_intended')
    EventHub.$on('_day.reload_intended', this.fetchHighlights)

    this.fetchHighlights()
  }

  fetchHighlights () {
    if (this.$fetch === undefined) {
      return
    }

    this.$fetch()
  }

  head () {
    let href
    const domain = `https://revue-de-presse.org${this.$route.path}`

    if (this.$route.path[this.$route.path.length - 1] === '/') {
      href = domain.replaceAll(new RegExp('/+$', 'g'), '')
    } else {
      href = domain
    }

    if (
      this.showingContactPage ||
      this.showingLegalNoticePage ||
      this.showingSourcesPage
    ) {
      let title
      let description
      let url

      const suffix = ' - Revue-de-presse.org 🦉'

      switch (true) {
        case this.showingContactPage:

          description = 'Page de contact de revue-de-presse.org'
          title = `Nous contacter${suffix}`
          url = 'https://revue-de-presse.org/nous-contacter'

          break

        case this.showingLegalNoticePage:

          description = 'Mentions légales de revue-de-presse.org'
          title = `Mentions légales${suffix}`
          url = 'https://revue-de-presse.org/mentions-legales'

          break

        case this.showingSourcesPage:

          description = 'Sources de revue-de-presse.org'
          title = `Sources${suffix}`
          url = 'https://revue-de-presse.org/sources'

          break
      }

      return {
        title,
        meta: [
          { hid: 'description', name: 'description', content: description },
          {
            hid: 'og:url',
            property: 'og:url',
            content: url
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: title
          }
        ]
      }
    }

    return {
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href
        }
      ]
    }
  }

  updateHighlights () {
    this.items = []
    const day = this.startDate

    if (day === Time.formatDate(this.now())) {
      this.$router.push({
        path: '/'
      })

      return
    }

    this.$router.push({
      path: `/${day}`
    })
  }

  validate (ctx: Context) {
    if ([
      'legal-notice',
      'homepage',
      'contact',
      'source',
      'sources',
      'not-found'
    ].find(route => route === ctx.route.name)) {
      return true
    }

    if (ctx.route.name === 'curated-highlights' && ctx.route.path.endsWith('/')) {
      return false
    }

    const selectedDate = setTimezone(new Date(ctx.params.day))
    const greaterThanMinDate = setTimezone(new Date(Date.parse('01 Jan 2018 00:00:00 GMT'))) <= selectedDate
    const lesserThanMaxDate = selectedDate <= now()

    return greaterThanMinDate && lesserThanMaxDate
  }

  mounted () {
    if (
      this.$route.name === 'curated-highlights' && (
        !isValidDate(this.$route.params.day) ||
        setTimezone(new Date(this.$route.params.day)) > now() ||
        setTimezone(new Date(this.$route.params.day)) < setTimezone(getMinDate())
      )
    ) {
      return this.$nuxt.error({ statusCode: 404, message: '?', path: '/contenu-introuvable' })
    }

    if (
      [
        'curated-highlights',
        'homepage',
        'contact',
        'legal-notice',
        'source',
        'sources',
        'not-found'
      ].every(r => r !== this.$route.name)
    ) {
      return this.$nuxt.error({ statusCode: 404, message: '?', path: '/contenu-introuvable' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_day.scss';
</style>
