import { Component, Vue } from 'nuxt-property-decorator'
import SharedState from '../modules/shared-state'
import EventHub from '../modules/event-hub'
import Errors from '../modules/errors'
import { setTimezone } from './date'

type Media = {
  url: string,
  sizes: {[key: string]: {[key: string]: number}},
  title: string,
}

type RawFavoritesMetrics = {
  delta?: number,
  favorites: number,
  checkedAt: string
}

type RawRetweetsMetrics = {
  delta?: number,
  retweets: number,
  checkedAt: string
}

type FavoritesMetrics = {
  delta: number,
  value: number,
  checkedAt: Date
}

type RetweetsMetrics = {
  delta: number,
  value: number,
  checkedAt: Date
}

type VanityMetrics = {
  favorites: FavoritesMetrics[]
  retweets: RetweetsMetrics[]
}

type RawStatus = {
  base64_encoded_avatar?: string,
  base64_encoded_media?: string,
  username: string,
  avatarUrl: string,
  publishedAt: Date,
  statusId: string,
  text: string,
  url: string,
  isVisible: boolean,
  media: Media[],
  totalRetweet: number,
  totalLike: number,
  links: string[],
  original_document: string,
  avatar_url: string,
  status_id: string,
  published_at: string,
  retweet_count: number,
  favorite_count: number,
  status_replied_to?: RawStatus,
  full_text?: string,
  liked_by?: string,
  retweet?: number,
  username_of_retweeting_member?: string
}

type TweetUrl = {
  url: string,
  display_url: string,
  expanded_url: string
}

type Entities = {
  urls: Array<TweetUrl>,
}

type FormattedStatus = {
  base64EncodedAvatar?: string
  base64EncodedMedia?: string
  username: string,
  name: string,
  publisherId: string,
  avatarUrl: string,
  publishedAt: Date,
  statusId: string,
  text: string,
  url: string,
  isVisible: boolean,
  media: Media[],
  totalRetweet: number,
  totalLike: number,
  links: RegExpMatchArray[]|null|Array<string>,
  inAggregate?: string,
  likedBy?: string,
  retweet?: number,
  usernameOfRetweetingMember?: string,
  statusRepliedTo?: FormattedStatus,
  key?: number,
  originalDocument: {
    entities: Entities
  },
  metrics?: VanityMetrics
}

type FilteringFn = (status: RawStatus) => boolean

type Filter = FilteringFn | undefined | null | 'media' | 'top100'

@Component
export default class StatusFormat extends Vue {
  filterStatuses (statuses: RawStatus[], filterType: Filter) {
    if (typeof filterType === 'undefined' || filterType === null) {
      return statuses
    }

    let filteredStatuses

    if (typeof filterType === 'function') {
      filteredStatuses = Object.values(statuses).filter(filterType)

      if (filteredStatuses.length === 0) {
        throw new Errors.NoRemainingStatusAfterApplyingFilter()
      }

      return filteredStatuses
    }

    if (filterType === 'media') {
      const filter = (status: RawStatus) => status.media && status.media.length > 0
      filteredStatuses = Object.values(statuses).filter(filter)
      if (filteredStatuses.length === 0) {
        EventHub.$emit('status_list.apologize_about_empty_list_intended')
        return Object.values(statuses)
      }

      return filteredStatuses
    }

    if (filterType === 'top100') {
      filteredStatuses = Object.values(Object.assign({}, statuses))
      const sortByRetweet = (firstStatus: RawStatus, secondStatus: RawStatus) => {
        if (firstStatus.totalRetweet === secondStatus.totalRetweet) {
          return 0
        }

        if (firstStatus.totalRetweet < secondStatus.totalRetweet) {
          return 1
        }

        return -1
      }

      return filteredStatuses.sort(sortByRetweet).slice(0, 10)
    }

    return statuses
  }

  formatStatus (tweet: RawStatus) {
    const formattedStatuses = this.formatStatuses([tweet])

    return formattedStatuses[0]
  }

  formatStatuses (statuses: RawStatus[]): FormattedStatus[] {
    if (typeof statuses === 'undefined' || statuses === null) {
      return []
    }

    let formattedStatuses: FormattedStatus[] = []

    if (typeof statuses.forEach !== 'function') {
      throw new TypeError(SharedState.errors.REQUIRED_COLLECTION)
    }

    statuses.forEach((status: RawStatus) => {
      if (
        typeof status === 'undefined' ||
          (typeof status.text === 'undefined' &&
              typeof status.full_text === 'undefined')
      ) {
        return
      }

      if (typeof status.full_text !== 'undefined') {
        status.text = status.full_text
      }

      if (typeof status.text.match !== 'function') {
        return
      }

      let links: RegExpMatchArray[]|null|Array<string> = status.text.match(/http(?:s)?:\/\/\S+/g)

      if (links === null || links === undefined || links.length <= 1) {
        links = []
      }

      let aggregate
      if (
        this.$route.name === 'press-review' ||
          this.$route.name === 'status'
      ) {
        aggregate = this.$route.name
      }
      if (this.$route.name === 'aggregate') {
        aggregate = this.$route.params.aggregateType
      }

      const originalDocument = JSON.parse(status.original_document)

      const metrics: VanityMetrics = {
        favorites: [],
        retweets: []
      }

      if (originalDocument.metrics) {
        metrics.favorites = originalDocument.metrics.favorites
          .filter((f: RawFavoritesMetrics) => typeof f.delta !== 'undefined')
          .map((f: RawFavoritesMetrics) => {
            return {
              checkedAt: setTimezone(new Date(f.checkedAt)),
              delta: f.delta,
              value: f.favorites,
            }
          })

        metrics.retweets = originalDocument.metrics.retweets
          .filter((r: RawRetweetsMetrics) => typeof r.delta !== 'undefined')
          .map((r: RawRetweetsMetrics) => {
            return {
              checkedAt: setTimezone(new Date(r.checkedAt)),
              delta: r.delta,
              value: r.retweets,
            }
          })
      }

      const formattedStatus: FormattedStatus = {
        base64EncodedAvatar: status.base64_encoded_avatar,
        base64EncodedMedia: status.base64_encoded_media,
        name: originalDocument.user.name,
        publisherId: originalDocument.user.id,
        inAggregate: aggregate,
        username: status.username,
        avatarUrl: status.avatar_url,
        publishedAt: setTimezone(new Date(status.published_at)),
        statusId: status.status_id,
        text: status.text,
        url: status.url,
        isVisible: false,
        media: status.media,
        totalRetweet: status.retweet_count,
        totalLike: status.favorite_count,
        links,
        originalDocument,
        metrics
      }

      if (status.status_replied_to) {
        formattedStatus.statusRepliedTo = this.formatStatuses([
          status.status_replied_to
        ])[0]
      }

      formattedStatus.retweet = status.retweet
      if (status.retweet) {
        formattedStatus.usernameOfRetweetingMember =
            status.username_of_retweeting_member
      }

      if (status.liked_by) {
        formattedStatus.likedBy = status.liked_by
      }

      formattedStatuses.push(formattedStatus)
    })

    formattedStatuses = formattedStatuses.sort(this.sortByPublicationDate)
    formattedStatuses = formattedStatuses.reduce(
      (statusCollection: FormattedStatus[], status: FormattedStatus) => {
        statusCollection.indexOf(status)
        statusCollection[
          statusCollection.indexOf(status)
        ].key = statusCollection.indexOf(status)
        return statusCollection
      },
      formattedStatuses
    )

    return formattedStatuses
  }

  sortByPublicationDate (statusA: FormattedStatus, statusB: FormattedStatus): number {
    if (statusA.publishedAt === statusB.publishedAt) {
      return 0
    }

    if (statusA.publishedAt < statusB.publishedAt) {
      return 1
    }

    return -1
  }
}

export { TweetUrl, FormattedStatus, RawStatus, Media, VanityMetrics, FavoritesMetrics, RetweetsMetrics }
