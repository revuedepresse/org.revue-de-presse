<template>
  <div
    :class="publisherClasses"
    :style="publisherAvatar"
  >
    <div class="publisher__container">
      <a :href="publisherUrl">
        <img
          :alt="textAlternative"
          :src="avatarUrl"
          class="publisher__avatar"
          width="46px"
          height="46px"
        >
      </a>
      <div class="publisher__identifiers">
        <a
          class="publisher__name"
          :href="publisherUrl"
        >
          {{ name }}
        </a>
        <a
          class="publisher__username"
          :href="publisherUrl"
        >
          @{{ username }}
        </a>
      </div>
    </div>
    <a
      v-show="!removeTwitterLogo"
      href="https://twitter.com"
    >
      <font-awesome-icon
        class="publisher__platform"
        :icon="['fab', 'twitter']"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

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
    type: String,
    required: true
  })
  avatarUrl!: string

  @Prop({
    type: Boolean,
    default: false
  })
  removeTwitterLogo!: boolean

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
    const size = '46px'

    return `
      --avatar-background: center / ${size} repeat url(${this.avatarUrl});
      --avatar-url: url(${this.avatarUrl});
      --avatar-size: ${size};
    `
  }

  get publisherUrl () {
    return `https://twitter.com/${this.username}`
  }
}
</script>

<style lang="scss" scoped>
@import './publisher.scss';
</style>
