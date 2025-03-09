<template>
  <div
    :class="publisherClasses"
    :style="publisherAvatar"
  >
    <div class="publisher__container">
      <a
        :aria-label="label(name)"
        :href="publisherUrl"
        rel="nofollow noreferrer noopener"
      >
        <img
          :alt="textAlternative"
          :src="defaultProfilePicture"
          :srcset="profilePicturesSet"
          :class="avatarClasses()"
          width="48px"
          height="48px"
          @error="onError"
        >
      </a>
      <div class="publisher__identifiers">
        <a
          :aria-label="label(name)"
          :href="publisherUrl"
          class="publisher__name"
          rel="nofollow noreferrer noopener"
        >
          {{ name }}
        </a>
        <a
          :aria-label="label(name)"
          class="publisher__username"
          rel="nofollow noreferrer noopener"
          :href="publisherUrl"
        >
          @{{ username }}
        </a>
      </div>
    </div>
    <img
      v-if="!removeTwitterLogo"
      class="publisher__platform"
      alt="logo de Bluesky"
      width="20"
      height="28"
      :src="logo"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ProfilePicture } from '~/mixins/status-format'
import BlueskyLogo from '~/assets/bluesky-logo.png?data'

@Component
export default class Publisher extends Vue {
  @Prop({
    type: String,
    required: true
  })
    name!: string

  @Prop({
    type: String,
    required: true
  })
    username!: string

  @Prop({
    type: Object,
    required: true
  })
    profilePictures!: ProfilePicture

  @Prop({
    type: String,
    required: true
  })
    publicationUrl!: string

  @Prop({
    type: Boolean,
    default: false
  })
    removeTwitterLogo!: boolean

  canNotLoadAvatar = false

  get logo () {
    return BlueskyLogo
  }

  get defaultProfilePicture (): string {
    return this.profilePictures.x1
  }

  get profilePicturesSet (): string {
    return `${this.profilePictures.x1} 1x, ${this.profilePictures.x2} 2x, ${this.profilePictures.x3} 3x`
  }

  get textAlternative () {
    return `${this.name} avatar`
  }

  get publisherClasses () {
    return {
      publisher: true,
      publisher__intro: this.removeTwitterLogo
    }
  }

  get publisherAvatar () {
    const size = '48px'

    return `
      --avatar-background: center / ${size} repeat url(${this.profilePictures.x1});
      --avatar-url: url(${this.profilePictures.x1});
      --avatar-size: ${size};
    `
  }

  get publisherUrl () {
    return `https://twitter.com/${this.username}`
  }

  avatarClasses () {
    return {
      publisher__avatar: true,
      'publisher__avatar--hide': this.canNotLoadAvatar
    }
  }

  label (name: string): string {
    return `Lien vers compte Bluesky de ${name}`
  }

  onError () {
    this.canNotLoadAvatar = true
  }
}
</script>

<style lang="scss" scoped>
@import './publisher.scss';
</style>
