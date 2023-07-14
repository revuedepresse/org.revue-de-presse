import { Component } from 'nuxt-property-decorator'
import Config, { Routes } from '../config'
import DateMixin, { setTimezone } from './date'
import { FormattedStatus } from './status-format'

export const HIGHLIGHTS_PATH_PREFIX = '/actualites-du-'

export const localizeDate = (date: string): string => {
  const event = setTimezone(new Date(date))
  const pattern = '[\\u0300-\\u036f]'

  return `${event.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
    .normalize('NFD').replace(new RegExp(pattern, 'gi'), '')
    .replace(new RegExp('\\s', 'gi'), '-')
}

export const sourcePath = (status: { publisherId: string, username: string }): string => {
  return `/source/${status.publisherId}/${status.username}`
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

  get homepagePath () {
    return '/'
  }

  get legalNoticePagePath (): string {
    return '/mentions-legales'
  }

  get contactPagePath (): string {
    return '/nous-contacter'
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

  get showingSourceContents () {
    return this.showingSourcePage || this.showingSourcesPage
  }

  get supportPagePath (): string {
    return '/nous-soutenir'
  }

  get sourcesPagePath (): string {
    return '/sources'
  }

  sourcePath (status: FormattedStatus) {
    return `${sourcePath(status)}`
  }

  localizeDatePath (day: string): string {
    return `${HIGHLIGHTS_PATH_PREFIX}${this.localizeDate(day)}`
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
