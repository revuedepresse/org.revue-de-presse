import type { Route } from 'vue-router'
import { Component, mixins } from 'nuxt-property-decorator'
import Sources from '../assets/sources.json'
import ApiMixin from '../mixins/api'

type Source = {
  name: string,
  twitterId: number,
  username: string,
  url: string
}

export const isValidSourceRoute = ({ sortedSources, route }: { sortedSources: Source[], route: Route }): boolean => {
  if (route.name === 'source' && route.params.twitterId) {
    const twitterId: number = parseInt(route.params.twitterId, 10)
    const filteredSource = sortedSources.find(s => s.twitterId === twitterId)

    return typeof filteredSource !== 'undefined'
  }

  return false
}

export const sortSources = (): Source[] => {
  if (typeof Sources === 'undefined') {
    return []
  }

  const sources: Source[] = structuredClone(Sources)

  return sources.sort((left: Source, right: Source) => {
    if (left.username === right.username) {
      return 0
    }

    if (left.username < right.username) {
      return -1
    }

    return 1
  })
}

export { Source }

@Component
export default class SourcesMixin extends mixins(ApiMixin) {
  get sortedSources (): Source[] {
    return sortSources()
  }

  isValidSourceRoute (route: Route): boolean {
    return isValidSourceRoute({ sortedSources: this.sortedSources, route })
  }
}
