<template>
  <a
    :aria-label="label"
    :href="intentUrl"
    class="web-intent"
    rel="nofollow noreferrer noopener"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <ReplyIcon
      v-if="intentType === 'reply'"
      :class="iconClasses"
    />
    <RetweetIcon
      v-else-if="intentType === 'retweet'"
      :class="iconClasses"
    />
    <LikeIcon
      v-else
      :class="iconClasses"
    />
    <span class="web-intent__hidden">{{ label }}</span>
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LikeIcon from '~/assets/icons/icon-like-intent.svg?inline'
import ReplyIcon from '~/assets/icons/icon-reply.svg?inline'
import RetweetIcon from '~/assets/icons/icon-retweet.svg?inline'

@Component({
  components: { LikeIcon, ReplyIcon, RetweetIcon }
})
export default class WebIntent extends Vue {
  @Prop({
    type: String,
    required: true
  })
    statusId!: string

  @Prop({
    type: String,
    required: true
  })
    intentType!: string

  hoveringIcon = false

  get label (): string {
    if (this.intentType === 'reply') {
      return 'Commenter'
    }

    if (this.intentType === 'retweet') {
      return 'Retweet'
    }

    return 'Mettre en favoris'
  }

  get iconClasses (): {[key: string]: boolean} {
    const classes: {[key: string]: boolean} = {}

    if (this.intentType === 'reply') {
      classes['web-intent__reply'] = true

      if (this.hoveringIcon) {
        classes['web-intent__reply--hover'] = true
      }
    }

    if (this.intentType === 'retweet') {
      classes['web-intent__retweet'] = true

      if (this.hoveringIcon) {
        classes['web-intent__retweet--hover'] = true
      }
    }

    if (this.intentType === 'like') {
      classes['web-intent__like'] = true

      if (this.hoveringIcon) {
        classes['web-intent__like--hover'] = true
      }
    }

    return classes
  }

  get intentUrl (): string {
    const pathPrefix = 'https://twitter.com/intent'

    if (this.intentType === 'reply') {
      return `${pathPrefix}/tweet?in_reply_to=${this.statusId}`
    }

    if (this.intentType === 'retweet') {
      return `${pathPrefix}/retweet?tweet_id=${this.statusId}`
    }

    return `${pathPrefix}/like?tweet_id=${this.statusId}`
  }

  onMouseOver () {
    this.hoveringIcon = true
  }

  onMouseLeave () {
    this.hoveringIcon = false
  }
}
</script>

<style lang="scss" scoped>
@import './web-intent.scss';
</style>
