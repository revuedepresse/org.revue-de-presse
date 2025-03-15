<template>
  <ul
    class="list__items"
  >
    <li
      v-for="(curatedHighlight, index) in curatedHighlights"
      :key="curatedHighlight.tweetId"
      :data-key="curatedHighlight.tweetId"
      class="list__item"
    >
      <Status
        :status-at-first="formatStatus(curatedHighlight.tweet)"
        :show-media="showMedia"
        :is-baseline-view="isBaselineView"
        :is-intro="isIntro(index)"
        :ref-name="index"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import Contents from '../../assets/contents.json'
import Intro from '../intro/intro.vue'
import LoadingSpinner from '../loading-spinner/loading-spinner.vue'
import Status from '../status/status.vue'
import Outro from '../outro/outro.vue'
import StatusFormatMixin, { RawStatus } from '~/mixins/status-format'
import DateMixin, { now, setTimezone } from '~/mixins/date'
import ApiMixin from '~/mixins/api'
import Logo1x from '~/assets/revue-de-presse_48x48.png?data'
import Logo2x from '~/assets/revue-de-presse_96x96.png?data'
import Logo3x from '~/assets/revue-de-presse_144x144.png?data'

@Component({
  components: {
    Intro,
    LoadingSpinner,
    Outro,
    Status
  }
})
export default class HighlightList extends mixins(ApiMixin, DateMixin, StatusFormatMixin) {
  @Prop({
    type: String,
    required: true
  })
    endDate!: string

  @Prop({
    type: String,
    required: true
  })
    startDate!: string

  @Prop({
    type: Boolean,
    default: true
  })
    showMedia!: boolean

  @Prop({
    type: Boolean,
    required: true,
    default: false
  })
    isShowingAnotherPage!: boolean

  @Prop({
    type: Boolean,
    required: true,
    default: false
  })
    isBaselineView!: boolean

  @Prop({
    type: Array,
    default: []
  })
    items!: Array<{ status: RawStatus }>

  get intro (): RawStatus {
    const text = Contents.description

    return {
      base64_encoded_avatar: {
        x1: Logo1x,
        x2: Logo2x,
        x3: Logo3x
      },
      screen_name: 'revue_2_presse',
      avatar_url: Logo1x,
      published_at: this.formatDate(this.now()),
      date: this.now(),
      publication_id: '0',
      text,
      url: '',
      isVisible: true,
      media: [],
      reposts: 0,
      likes: 0,
      retweet_count: 0,
      favorite_count: 0,
      links: [],
      original_document: JSON.stringify({ user: { name: 'Revue de presse' } })
    }
  }

  get curatedHighlights (): Array<{tweet: RawStatus, tweetId: string}> {
    return this.highlights.map((h) => {
      const tweet = structuredClone(h.status)
      return {
        tweet,
        tweetId: tweet.publication_id
      }
    })
  }

  get highlights () {
    const highlights = this.items

    let intro: Array<{ status: RawStatus }> = []
    if (this.$device.isDesktop) {
      intro = [{ status: this.intro }]
    }

    if (this.isShowingAnotherPage) {
      return intro
    }

    if (this.isBaselineView) {
      return intro.concat(highlights)
    } else {
      return highlights.slice(0, 3)
    }
  }

  get visitingCuratedHighlightsRoute () {
    return ['curated-highlights', 'highlights', 'homepage'].includes(this.$route.name || '')
  }

  head () {
    if (this.visitingCuratedHighlightsRoute && this.highlights.length > 1) {
      const whitespace = '\\s'
      const pattern = `https?://[^${whitespace}]+`

      let highlightIndex = 1
      if (this.$device.isMobile) {
        highlightIndex = 0
      }

      const description = (this.highlights[highlightIndex].status.text || '')
        .replaceAll(new RegExp(pattern, 'ig'), '')
        .replaceAll(new RegExp('[\r\n\\s]+', 'ig'), ' ')

      let event = now()
      if (this.$route.name !== 'homepage') {
        event = setTimezone(new Date(this.startDate))
      }
      const localizedDate = event.toLocaleDateString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })

      const title = `Revue de presse du ${localizedDate} - Revue-de-presse.org 🦉`

      return {
        title,
        meta: [
          { hid: 'description', name: 'description', content: description },
          {
            hid: 'og:url',
            property: 'og:url',
            content: `https://revue-de-presse.org/${this.startDate}/`
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: title
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: description
          },
          {
            hid: 'twitter:description',
            property: 'twitter:description',
            content: description
          }
        ]
      }
    }
  }

  isIntro (key: number) {
    return this.$device.isDesktop && key === 0
  }
}
</script>

<style lang="scss" scoped>
@import './highlight-list.scss';
</style>
