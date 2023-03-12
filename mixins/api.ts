import { Component } from 'nuxt-property-decorator'
import Config, { Routes } from '../config'
import DateMixin, { now, setTimezone } from './date'
import { FormattedStatus } from './status-format'

export const HIGHLIGHTS_PATH_PREFIX = '/actualites-du-'

export const localizeDate = (date: string): string => {
  const event = setTimezone(new Date(date))
  const pattern = '[\\u0300-\\u036f]'

  return `${event.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
    .normalize('NFD').replace(new RegExp(pattern, 'gi'), '')
    .replace(new RegExp('\\s', 'gi'), '-')
}

@Component
export default class ApiMixin extends DateMixin {
  get routes (): any {
    const routePaths: Routes = Config.getRoutes()
    const routes: {[key: string]: object} = {}

    // Handle actions separately for more clarity
    routes.actions = routePaths.actions

    return routes
  }

  get distinctSourcesQueryParam (): string {
    if (this.showingDistinctSources) {
      return '?sources-distinctes'
    }

    return ''
  }

  get homepagePath () {
    const today = this.formatDate(now())

    if (this.distinctSourcesQueryParam) {
      return `/${today}${this.localizeDatePath(today)}`
    }

    return '/'
  }

  get legalNoticePagePath (): string {
    return `/mentions-legales${this.distinctSourcesQueryParam}`
  }

  get contactPagePath (): string {
    return `/nous-contacter${this.distinctSourcesQueryParam}`
  }

  get supportPagePath (): string {
    return `/nous-soutenir${this.distinctSourcesQueryParam}`
  }

  get sourcesPagePath (): string {
    return `/sources${this.distinctSourcesQueryParam}`
  }

  sourcePathPath (status: FormattedStatus) {
    return `/source/${status.publisherId}/${status.username}${this.distinctSourcesQueryParam}`
  }

  get showingDistinctSources () {
    const matchingParam: string|undefined = Object.keys(this.$route.query).find(param => param === 'sources-distinctes')

    return typeof matchingParam !== 'undefined' || this.$route.name === 'highlights-from-distinct-sources'
  }

  get switchBetweenFilteringModes () {
    const path = this.$route.path
    const query = structuredClone(this.$route.query)
    const params = structuredClone(this.$route.params)

    const pattern = '\\?[^\\?]+$'
    const postSubstitutionPath = path.replace(new RegExp(pattern, 'gi'), '')

    if (this.showingDistinctSources) {
      delete query['sources-distinctes']

      if (this.$route.name === 'highlights-from-distinct-sources') {
        if (params.day === this.formatDate(this.now())) {
          return this.$router.resolve({ name: 'homepage', query }).href
        }

        return this.$router.resolve({ name: 'curated-highlights', params, query }).href
      }

      return this.$router.resolve({ path: postSubstitutionPath, query }).href
    }

    if (this.$route.name === 'curated-highlights') {
      delete query['sources-distinctes']

      params.localizedDate = this.localizeDate(params.day)

      return this.$router.resolve({ name: 'highlights-from-distinct-sources', params }).href
    }

    if (this.$route.name === 'homepage') {
      delete query['sources-distinctes']

      params.day = this.formatDate(this.now())
      params.localizedDate = this.localizeDate(params.day)

      return this.$router.resolve({ name: 'highlights-from-distinct-sources', params }).href
    }

    query['sources-distinctes'] = 'true'

    return this.$router.resolve({ path: postSubstitutionPath, query }).href
  }

  localizeDatePath (day: string): string {
    if (this.showingDistinctSources) {
      return `${HIGHLIGHTS_PATH_PREFIX}${this.localizeDate(day)}`
    }

    return ''
  }

  localizeDate (date: string): string {
    return localizeDate(date)
  }

  navigateToHomepage () {
    this.$router.push({ path: this.homepagePath })
  }

  dailyHighlightsPath (day: string): string {
    return `/${day}${this.localizeDatePath(day)}`
  }

  navigateToHighlightsForDay (day: string) {
    this.$router.push({ path: `${this.dailyHighlightsPath(day)}` })
  }
}
