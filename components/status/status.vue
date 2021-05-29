<template>
  <div :class="statusClasses()">
    <div class="status__row">
      <div class="status__publication-date">
        <a
          :href="status.url"
          class="status__url"
          rel="noreferrer"
          target="_blank"
        >{{ $dateFns.format(publicationDate, 'PPPPpp') }}</a>
      </div>
      <div class="status__vanity-metrics">
        <a
          :href="status.url"
          class="status__url status__url--permanent-link"
          rel="noreferrer"
        >
          Publication originale
        </a>
        <span class="status__vanity-metric">{{ retweet }}</span>
        <span class="status__vanity-metric">{{ favorite }}</span>
      </div>
    </div>

    <div
      class="status__row"
    >
      <div class="status__publisher">
        <a
          :style="publisherStyle"
          :href="memberTimelineUrl"
          class="status__username"
          rel="noreferrer"
          target="_blank"
        >
          <span class="status__publisher-name">@{{ status.username }}</span>
        </a>
      </div>
    </div>

    <div class="status__row">
      <div class="status__content">
        <p
          class="status__text"
          v-html="statusText"
        />
      </div>
    </div>

    <div
      v-if="canShowMedia"
      class="status__row status__row--media"
    >
      <div class="status__media">
        <img
          v-for="(document, index) in status.media"
          :key="index"
          class="status__media-item lazyload"
          :alt="getMediaTitle(document)"
          :title="getMediaTitle(document)"
          :data-src="getMediaUrl(document)"
          :style="getMediaProperties()"
          :width="getMediaWidth(document)"
          :height="getMediaHeight(document)"
          @click="openMediaItem(document)"
        >
      </div>
    </div>

    <div class="status__row">
      <div class="status__web-intents">
        <a
          v-if="canBeRepliedTo"
          :href="urls.reply"
          class="status__web-intent"
          rel="noreferrer"
          target="_blank"
        >
          <span>Reply</span>
        </a>
        <a
          v-if="canBeRetweeted"
          :href="urls.retweet"
          class="status__web-intent"
          rel="noreferrer"
          target="_blank"
        >
          <span>Retweet</span>
        </a>
        <a
          v-if="canBeLiked"
          :href="urls.like"
          class="status__web-intent"
          rel="noreferrer"
          target="_blank"
        >
          <span>Like</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, mixins } from 'nuxt-property-decorator'
import ApiMixin from '../../mixins/api'
import StatusFormatMixin, { FormattedStatus, Media } from '../../mixins/status-format'
import EventHub from '../../modules/event-hub'
import SharedState, { Errors, VisibleStatuses } from '../../modules/shared-state'
import Publisher from '../publisher/publisher.vue'

@Component({
  components: { Publisher }
})
class Status extends mixins(ApiMixin, StatusFormatMixin) {
  @Prop({
    type: Object,
    required: true
  })
  statusAtFirst!: FormattedStatus

  @Prop({
    type: Boolean,
    default: true
  })
  showMedia!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  canBeLiked!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  canBeRetweeted!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  canBeRepliedTo!: boolean

  @Prop({
    type: String,
    default: ''
  })
  fromAggregateType!: string

  errorMessages: Errors = SharedState.errors
  logger = new SharedState.Logger(this.$sentry)
  status: FormattedStatus = this.statusAtFirst
  visibleStatuses: VisibleStatuses = SharedState.state.visibleStatuses
  aggregateType: string = this.fromAggregateType

  get canShowMedia () {
    return this.status.media && this.status.media.length > 0 && this.showMedia
  }

  get favorite () {
    return this.status.totalLike || 0
  }

  get urlWhichCanBeShared () {
    const basePath = `${window.location.protocol}//${window.location.host}`
    return `${basePath}/#/aggregate/${this.fromAggregateType}/${
        this.status.statusId
    }`
  }

  get retweet () {
    return this.status.totalRetweet || 0
  }

  get statusText () {
    if (
      typeof this.status === 'undefined' ||
        typeof this.status === 'string'
    ) {
      return ''
    }

    return this.formatStatusText(this.status)
  }

  get urls () {
    if (typeof this.status === 'undefined') {
      return ''
    }

    return {
      reply: `https://twitter.com/intent/tweet?in_reply_to=${
          this.status.statusId
      }`,
      retweet: `https://twitter.com/intent/retweet?tweet_id=${
          this.status.statusId
      }`,
      like: `https://twitter.com/intent/like?tweet_id=${this.status.statusId}`
    }
  }

  get publicationDate () {
    if (typeof this.status === 'undefined') {
      return ''
    }

    return new Date(this.status.publishedAt)
  }

  get memberTimelineUrl () {
    if (typeof this.status === 'undefined') {
      return ''
    }

    return `https://twitter.com/${this.status.username}`
  }

  get publisherStyle () {
    if (typeof this.status.avatarUrl === 'undefined') {
      return ''
    }
    const size = '48px'
    return `--avatar-url: center / ${size} no-repeat url("${this.status.avatarUrl}");
      --avatar-size: ${size};
      `
  }

  @Watch('statusAtFirst')
  onStatusAtFirstChange (_: FormattedStatus, newStatus: FormattedStatus) {
    this.status = newStatus
  }

  updated () {
    this.status = this.statusAtFirst
  }

  formatStatusText (status: FormattedStatus) {
    if (typeof status === 'undefined' || typeof status === 'string') {
      return ''
    }

    let text = this.replaceHyperlinksWithAnchors(status.text)
    text = this.replaceMentionsWithWithAnchors(text)

    return text.replace(/\s/g, ' ')
  }

  replaceHyperlinksWithAnchors (subject: string) {
    const whitespace = 's'
    const startCharacterClass = '[^\\'
    const pattern = `(http(s?)://${startCharacterClass}${whitespace}]+)`

    return subject.replace(new RegExp(pattern, 'gi'), (matchingText: string) => {
      if (process.env.API_HOST !== undefined && matchingText.includes(process.env.API_HOST)) {
        return matchingText
      }

      return `<a class="status__text-external-link"
                 rel="noreferrer"
                 target="_blank" href="${matchingText}">${matchingText}</a>`
    })
  }

  replaceMentionsWithWithAnchors (subject: string) {
    const whitespace = 's'
    const startCharacterClass = '[^<>\\'
    const pattern = `(\\${whitespace}?)@(${startCharacterClass}${whitespace}]+)(\\${whitespace}?)`

    return subject.replace(
      new RegExp(pattern, 'gi'),
      (matchingSubstring: string, prefix: string, mention: string, suffix: string) => {
        if (matchingSubstring.includes('revue-de-presse')) {
          return matchingSubstring
        }

        return `${prefix}<a
                   class="status__text-external-link"
                   rel="noreferrer"
                   target="_blank"
                   href="https://twitter.com/${mention}">@${mention}</a>${suffix}`
      }
    )
  }

  statusClasses () {
    return { status: true }
  }

  getMediaProperties () {
    return {
      width: 'calc(100% - 1em)',
      'max-height': '80vw',
      'max-width': '90vw',
      'object-fit': 'scale-down'
    }
  }

  getMediaUrl (media: Media) {
    return `${media.url}:small`
  }

  getMediaHeight (media: Media) {
    return media.sizes.small.h
  }

  getMediaWidth (media: Media) {
    return media.sizes.small.w
  }

  getMediaTitle (media: Media) {
    return media.title ? media.title : ''
  }

  goToPermalink (status: FormattedStatus) {
    this.$router.push({
      name: 'status',
      params: { statusId: status.statusId }
    })
  }

  openMediaItem (media: Media) {
    EventHub.$emit('modal_window.show_intended', { media })
  }
}

export default Status
</script>

<style lang='scss' scoped>
@import './status.scss';
</style>
