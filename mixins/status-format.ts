import { Component, Vue } from 'nuxt-property-decorator'
import SharedState from '../modules/shared-state'
import { setTimezone } from './date'

type Media = {
  url: string,
  sizes: {[key: string]: {[key: string]: number}},
  title: string,
}

// type RawFavoritesMetrics = {
//   delta?: number,
//   favorites: number,
//   checkedAt: string
// }
//
// type RawRetweetsMetrics = {
//   delta?: number,
//   retweets: number,
//   checkedAt: string
// }

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

type ProfilePicture = {
  x1: string,
  x2: string,
  x3: string
}

type RawStatus = {
  avatar_url: string,
  base64_encoded_avatar?: {
    x1: string,
    x2: string,
    x3: string,
  },
  base64_encoded_media?: string,
  screen_name: string,
  date: Date,
  reposts: number,
  likes: number,
  publication_id: string,
  text: string,
  url: string,
  isVisible: boolean,
  media: Media[],
  links: string[],
  original_document: string,
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

type FormattedStatus = {
  base64_encoded_avatar?: ProfilePicture
  base64EncodedAvatar?: ProfilePicture
  base64EncodedMedia?: string
  avatarUrl?: string
  screen_name: string,
  publishedAt: Date,
  statusId: string,
  text: string,
  url: string,
  isVisible: boolean,
  media: Media[],
  reposts: number,
  likes: number,
  links: RegExpMatchArray[]|null|Array<string>,
  inAggregate?: string,
  likedBy?: string,
  retweet?: number,
  usernameOfRetweetingMember?: string,
  statusRepliedTo?: FormattedStatus,
  key?: number,
  metrics?: VanityMetrics
}

@Component
export default class StatusFormat extends Vue {
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

      const metrics: VanityMetrics = {
        favorites: [],
        retweets: []
      }

      const formattedStatus: FormattedStatus = {
        avatarUrl: status.avatar_url,
        base64EncodedAvatar: {
          x1: status.avatar_url,
          x2: status.avatar_url,
          x3: status.avatar_url,
        },
        base64EncodedMedia: status.base64_encoded_media,
        screen_name: status.screen_name,
        inAggregate: aggregate,
        publishedAt: setTimezone(new Date(status.date)),
        statusId: status.publication_id,
        text: status.text,
        url: status.url,
        isVisible: false,
        media: status.media,
        reposts: status.reposts,
        likes: status.likes,
        links,
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

export {
  TweetUrl,
  ProfilePicture,
  FormattedStatus,
  RawStatus,
  Media,
  VanityMetrics,
  FavoritesMetrics,
  RetweetsMetrics
}
