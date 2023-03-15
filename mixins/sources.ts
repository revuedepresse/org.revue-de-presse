import type { Route } from 'vue-router'
import { Component, Vue } from 'nuxt-property-decorator'
import Sources from '../assets/sources.json'

type Source = {
  name: string,
  twitterId: number,
  username: string,
  url: string
}

export { Source }

@Component
export default class SourcesMixin extends Vue {
  get sortedSources (): Source[] {
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

  isInvalidSourceRoute (route: Route): boolean {
    const sortedSources = this.sortedSources

    if (route.name === 'source' && route.params.twitterId) {
      const twitterId: number = parseInt(this.$route.params.twitterId, 10)
      const filteredSource = sortedSources.find(s => s.twitterId === twitterId)

      return typeof filteredSource === 'undefined'
    }

    return true
  }
}
