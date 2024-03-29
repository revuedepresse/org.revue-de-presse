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
    <a
      v-if="!removeTwitterLogo"
      :aria-label="label(name)"
      :href="publicationUrl"
      rel="noreferrer nofollow noopener"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="twitter"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="publisher__platform svg-inline--fa fa-twitter"
      >
        <path
          fill="currentColor"
          d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
        >
        </path>
      </svg>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ProfilePicture } from '~/mixins/status-format'

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
    return `Lien vers compte Twitter de ${name}`
  }

  onError () {
    this.canNotLoadAvatar = true
  }
}
</script>

<style lang="scss" scoped>
@import './publisher.scss';
</style>
