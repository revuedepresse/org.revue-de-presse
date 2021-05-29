<template>
  <div class="publisher" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
class Publisher extends Vue {
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
}

export default Publisher
</script>

<style lang="scss" scoped>
@import './publisher.scss';
</style>
