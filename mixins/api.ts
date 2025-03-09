import { Component } from 'nuxt-property-decorator'
import Config, { Routes } from '../config'
import type { RawStatus } from '../mixins/status-format'
import DateMixin, { setTimezone } from './date'

export const HIGHLIGHTS_PATH_PREFIX = '/actualites-du-'

export const MEDIA_INCLUDED = 0
export const MEDIA_EXCLUDED = 1

export const HIGHLIGHTS_FROM_DISTINCT_SOURCES = 1

export const RETWEETS_EXCLUDED = 0
export const RETWEETS_INCLUDED = 1

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

export const fetchHighlights = ({
  action,
  curatedHighlightsRoute,
  requestOptions,
  logger
}: { action: { method: string, route: string },
  curatedHighlightsRoute: string,
  requestOptions: {
    params: Record<string, null|string>,
    headers?: HeadersInit
  },
  logger: { error: (message: string, context: string, error: Error) => void }
}): Promise<{ statuses: Array<{ status: RawStatus }> }> => {
  const url = new URL(curatedHighlightsRoute)
  Object.keys(requestOptions.params).map((key: string) => {
    let param: string | null = requestOptions.params[key]
    if (param == null) {
      param = ''
    }

    return url.searchParams.set(key, param)
  })

  return fetch(
    url.toString(),
    {
      method: action.method,
      headers: requestOptions.headers
    }
  )
    .then(res => res.json())
    .catch((e) => {
      logger.error(
        e.message, 'highlight-list', e
      )
    })
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

  sourcePath ({
    publisher_id,
    screen_name,
  }: {
    publisher_id: string,
    screen_name: string
  }) {
    return `${sourcePath({
      publisherId: publisher_id, username: screen_name
    })}`
  }

  localizeDatePath (day: string): string {
    return `${HIGHLIGHTS_PATH_PREFIX}${this.localizeDate(day)}`
  }

  fetchCuratedHighlights ({
    action,
    curatedHighlightsRoute,
    requestOptions,
    logger
  }: { action: { method: string, route: string },
    curatedHighlightsRoute: string,
    requestOptions: { params: Record<string, string>, headers: Headers },
    logger: { error: (message: string, context: string, error: Error) => void }
  }): Promise<{ statuses: Array<{ status: RawStatus }> }> {
    return fetchHighlights({
      action,
      curatedHighlightsRoute,
      requestOptions,
      logger
    })
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
