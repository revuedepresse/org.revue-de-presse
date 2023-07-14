<template>
  <div>
    <link rel="preconnect" :href="getApiHost" crossorigin>
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
            :message="errorMessageProvider(day)"
            :show-error-message="showErrorMessage"
            :show-loading-spinner="showLoadingSpinner"
          />
          <LazyContact v-if="showingContactPage" />
          <LazyLegalNotice v-if="showingLegalNoticePage" />
          <LazySources v-if="showingSourceContents" />
          <Support />
        </div>
        <div class="_day__column">
          <Outro :class="outroClass" />
          <div
            v-if="isBaselineView"
            class="_day__navigation"
          >
            <DatePicker
              v-if="startDate"
              :start-date="startDate"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, mixins, namespace } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

import AppHeader, { HeightAware } from '../../components/app-header/app-header.vue'
import Support from '../../components/support/support.vue'
import Contact from '../../components/contact/contact.vue'
import DatePicker from '../../components/date-picker/date-picker.vue'
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.vue'
import LegalNotice from '../../components/legal-notice/legal-notice.vue'
import HighlightList from '../../components/highlight-list/highlight-list.vue'
import SharedState from '../../modules/shared-state'
import Sources from '../../components/sources/sources.vue'
import Outro from '../../components/outro/outro.vue'
import Config from '../../config'
import EventHub from '../../modules/event-hub'
import Time from '../../modules/time'
import SourcesMixin, { isValidSourceRoute, sortSources } from '~/mixins/sources'
import { RawStatus } from '~/mixins/status-format'
import { getMinDate, isValidDate, now, setTimezone } from '~/mixins/date'

if (SharedState.isProductionModeActive()) {
  Vue.config.productionTip = false
}

const MEDIA_INCLUDED = 0
const MEDIA_EXCLUDED = 1

const HIGHLIGHTS_FROM_SHARED_SOURCES = 0
const HIGHLIGHTS_FROM_DISTINCT_SOURCES = 1

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

const NO_REVIEW_ERROR_MESSAGE = 'Aucun contenu à découvrir pour le _date_.'

const DatePickerStore = namespace('date-picker')

@Component({
  components: {
    AppHeader,
    Contact,
    DatePicker,
    LegalNotice,
    LoadingSpinner,
    HighlightList,
    Outro,
    Sources,
    Support
  }
})
export default class Highlights extends mixins(SourcesMixin) {
  $refs!: {
    header: HeightAware,
    day: {
      offsetHeight: number
    },
    [key: string]: any
  }

  @Prop({
    type: Object,
    default: null
  })
    error: any

  @Prop({
    type: Function,
    default: (day = ''): string => {
      if (day.length > 0) {
        return NO_REVIEW_ERROR_MESSAGE
          .replace(
            '_date_',
            setTimezone(new Date(day)).toLocaleDateString(
              'fr-FR',
              { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            )
          )
      }

      return NO_REVIEW_ERROR_MESSAGE
        .replace(
          '_date_',
          now().toLocaleDateString(
            'fr-FR',
            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          )
        )
        .replace(
          '_nbsp_',
          '\xA0\xA0\xA0'
        )
    }
  })
    errorMessageProvider!: (day: string) => string

  items: Array<{ status: RawStatus }> = []

  includeRetweets: number = RETWEETS_EXCLUDED

  logger = new SharedState.Logger()

  pageSize = 10

  selectedAggregates: number[] = []

  @DatePickerStore.Getter
  public pickingDay!: boolean

  @DatePickerStore.Mutation
  public intendingToPick!: (date: Date) => void

  get visitingCuratedHighlightsRoute () {
    return this.$route.name === 'curated-highlights' || this.$route.name === 'highlights-from-distinct-sources'
  }

  get day (): string {
    if (
      this.visitingCuratedHighlightsRoute &&
      this.isValidDate(this.$route.params.day)
    ) {
      return this.$route.params.day
    }

    return ''
  }

  get areMediaVisible () {
    return !this.$device.isMobile || !this.isBaselineView
  }

  get fetchingData () {
    return this.$fetchState !== undefined && this.$fetchState.pending
  }

  get undefinedRoute () {
    return this.$route && this.$route.name === null
  }

  get fixedStyle () {
    return this.undefinedRoute ||
      this.showingNotFoundPage ||
      (
        this.showingCuratedHighlights &&
        !this.showingHomepage &&
        !this.validCuratedHighlightsDay
      ) ||
      (
        this.$nuxt.isOnline &&
        (
          this.items.length === 0 &&
          !this.showingContactPage &&
          !this.showingLegalNoticePage &&
          !this.showingSourcePage &&
          !this.showingSourcesPage &&
          !this.showingSupportPage
        ) &&
        this.$fetchState.pending === false
      )
  }

  get outroClass () {
    if (this.fixedStyle) {
      return 'outro--fixed'
    }

    return ''
  }

  get containerClass () {
    const filledContainerClass = '_day__container _day__container--filled'
    const nonEmptyList = this.$nuxt.isOnline && this.items.length > 0

    if (this.showingNotFoundPage) {
      return `${filledContainerClass}-with-emptiness`
    }

    if (nonEmptyList || this.fetchingData || this.undefinedRoute) {
      if (
        (
          this.error &&
          this.error.statusCode === 404
        ) ||
        this.isShowingAnotherPage
      ) {
        return `${filledContainerClass}-auto`
      }

      return filledContainerClass
    }

    if (
      !this.showingContactPage &&
      !this.showingLegalNoticePage &&
      !this.showingSourcePage &&
      !this.showingSourcesPage &&
      !this.showingSupportPage &&
      this.$nuxt.isOnline &&
      this.items.length === 0 &&
      this.$fetchState.pending === false
    ) {
      return `${filledContainerClass}-with-emptiness`
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

  get whichDateHasBeenPicked (): Date|null {
    return this.$store.getters['date-picker/datePicker']()
  }

  get endDate (): string {
    return this.defaultDates(this.whichDateHasBeenPicked).endDate
  }

  get startDate (): string {
    return this.defaultDates(this.whichDateHasBeenPicked).startDate
  }

  get isBaselineView () {
    if (this.$route === undefined) {
      return true
    }

    const paramNames = Object.keys(this.$route.query)
    const isBaselineViewActive = paramNames.find(p => p === 'naked') === undefined

    return this.$device.isDesktop || this.$device.isTablet || isBaselineViewActive
  }

  get showingNotFoundPage () {
    return this.$route.name === 'not-found'
  }

  get showErrorMessage (): boolean {
    if (this.showingSourcePage && !this.isValidSourceRoute(this.$route)) {
      return true
    }

    if (
      (this.showingHomepage && this.items.length > 0) ||
      this.showingContactPage ||
      this.showingLegalNoticePage ||
      this.showingSourcesPage ||
      this.showingSourcePage ||
      this.showingSupportPage
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
      this.fetchingData &&
      !this.showingNotFoundPage &&
      (this.showingHomepage || this.validCuratedHighlightsDay)
  }

  get showLoadingSpinnerComponent (): boolean {
    if (this.undefinedRoute) {
      return true
    }

    if (this.showingCuratedHighlights) {
      return this.fetchingData || this.items.length === 0 || (!this.validCuratedHighlightsDay && !this.showingHomepage)
    }

    if (this.showingSourcePage && !this.isValidSourceRoute(this.$route)) {
      return true
    }

    if (this.showingNotFoundPage) {
      return true
    }

    if (this.isShowingAnotherPage) {
      return false
    }

    return this.fetchingData
  }

  get showingCuratedHighlights () {
    return this.showingHomepage || this.visitingCuratedHighlightsRoute
  }

  get showingSupportPage () {
    return this.$route.name === 'support'
  }

  get showingHomepage () {
    return this.$route.name === 'homepage'
  }

  get validCuratedHighlightsDay () {
    if (!this.visitingCuratedHighlightsRoute) {
      return false
    }

    return this.isValidDate(this.$route.params.day) &&
      setTimezone(new Date(this.$route.params.day)) <= now() &&
      setTimezone(new Date(this.$route.params.day)) >= setTimezone(getMinDate())
  }

  get isShowingAnotherPage (): boolean {
    if (this.visitingCuratedHighlightsRoute) {
      return !this.validCuratedHighlightsDay
    }

    return this.showingContactPage ||
      this.showingLegalNoticePage ||
      this.showingNotFoundPage ||
      this.showingSourcePage ||
      this.showingSourcesPage ||
      this.showingSupportPage ||
      this.$route.name === 'source'
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

  async fetch () {
    if (this.undefinedRoute) {
      this.items = []

      return
    }

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

    this.items = []
    this.items = response.statuses
  }

  getRequestOptions (params: Params = {}) {
    const authenticationToken = localStorage.getItem('x-auth-token')

    const requestHeaders: Headers = new Headers()
    requestHeaders.set('x-auth-token', authenticationToken || '')

    let requestedDate = this.startDate

    if (
      this.$route.name === 'homepage' &&
      this.now().getHours() < 7
    ) {
      const d = new Date(this.startDate)
      d.setTime(d.getTime() - 12 * 60 * 60 * 1000)

      requestedDate = this.formatDate(setTimezone(d))
    }

    const requestOptions: RequestOptions = {
      headers: requestHeaders,
      params: {
        distinctSources: HIGHLIGHTS_FROM_DISTINCT_SOURCES,
        includeRetweets: RETWEETS_INCLUDED,
        excludeMedia: MEDIA_INCLUDED,
        startDate: requestedDate,
        endDate: requestedDate
      }
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

    if (!this.$device.isDesktop && !this.$device.isTablet) {
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
      this.showingSourcesPage ||
      this.showingSupportPage
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

        case this.showingSupportPage:

          description = 'Soutenir revue-de-presse.org'
          title = `Nous soutenir${suffix}`
          url = 'https://revue-de-presse.org/nous-soutenir'

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
        link: [
          {
            hid: 'canonical',
            rel: 'canonical',
            href
          }
        ],
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
    if (
      (this.$device.isDesktop && !this.pickingDay) ||
      this.$device.isMobile
    ) {
      return
    }

    const day = this.startDate

    if (day === Time.formatDate(this.now())) {
      this.navigateToHomepage()

      return
    }

    this.navigateToHighlightsForDay(day)
  }

  validate (ctx: Context) {
    if (ctx.route.name === 'source') {
      return isValidSourceRoute({ sortedSources: sortSources(), route: ctx.route })
    }

    if ([
      'legal-notice',
      'homepage',
      'contact',
      'sources',
      'support',
      'not-found'
    ].find(route => route === ctx.route.name)) {
      return true
    }

    if (
      (
        ctx.route.name === 'highlights-from-distinct-sources' ||
        ctx.route.name === 'curated-highlights'
      ) && ctx.route.path.endsWith('/')
    ) {
      return false
    }

    const selectedDate = setTimezone(new Date(ctx.params.day))
    const greaterThanMinDate = setTimezone(new Date(Date.parse('01 Jan 2018 00:00:00 GMT'))) <= selectedDate
    const lesserThanMaxDate = selectedDate <= now()

    return greaterThanMinDate && lesserThanMaxDate
  }

  get invalidCuratedHighlights () {
    return this.visitingCuratedHighlightsRoute &&
      this.isValidDate(this.$route.params.day) && (
      setTimezone(new Date(this.$route.params.day)) > now() ||
      setTimezone(new Date(this.$route.params.day)) < setTimezone(getMinDate())
    )
  }

  detectError () {
    const isSourceRoute = this.$route.name === 'source'

    if (!isSourceRoute && this.invalidCuratedHighlights) {
      this.$nuxt.error({
        statusCode: 404,
        message: NO_REVIEW_ERROR_MESSAGE.replace(
          '_date_',
          (new Date(this.$route.params.day))
            .toLocaleDateString(
              'fr-FR',
              { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            )
        ),
        path: '/contenu-introuvable'
      })

      return
    }

    if (isSourceRoute) {
      if (!isValidSourceRoute({ sortedSources: sortSources(), route: this.$route })) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'Aucun contenu à cette adresse.',
          path: '/contenu-introuvable'
        })
      }

      return
    }

    if (
      this.undefinedRoute ||
      [
        'curated-highlights',
        'highlights-from-distinct-sources',
        'homepage',
        'contact',
        'legal-notice',
        'sources',
        'support',
        'not-found'
      ].every(r => r !== this.$route.name) || (
        this.visitingCuratedHighlightsRoute &&
        !this.isValidDate(this.$route.params.day)
      )
    ) {
      this.$nuxt.error({
        statusCode: 404,
        message: 'Aucun contenu à cette adresse.',
        path: '/contenu-introuvable'
      })
    }
  }

  mounted () {
    if (this.$route.name === 'homepage') {
      this.intendingToPick(this.now())
    }

    if (
      this.visitingCuratedHighlightsRoute &&
      isValidDate(this.$route.params.day) &&
      setTimezone(new Date(this.$route.params.day)) <= now() &&
      setTimezone(new Date(this.$route.params.day)) >= setTimezone(getMinDate())
    ) {
      this.intendingToPick(new Date(this.$route.params.day))
    }

    this.detectError()
  }
}
</script>

<style lang="scss" scoped>
@import './_day.scss';
</style>
