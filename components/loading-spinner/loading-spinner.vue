<template>
  <div
    ref="loading-spinner"
    class="loading-spinner__container"
  >
    <div
      v-if="showLoadingSpinner"
      class="loading-spinner__spinner-container"
    >
      <Spinner
        name="folding-cube"
        :color="brandColor"
      />
    </div>
    <div
      v-else-if="showErrorMessage"
      class="loading-spinner"
    >
      <div
        class="loading-spinner__icon"
        :style="warningIcon"
      >
      </div>
      <p v-text="message" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import warningIcon from '~/assets/icons/icon-warning.svg'

@Component
class LoadingSpinner extends Vue {
  brandColor: string = '#00cdc7'

  @Prop({
    type: String
  })
  message: string

  @Prop({
    type: Boolean,
    default: false
  })
  showErrorMessage!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  showLoadingSpinner!: boolean

  get warningIcon () {
    const widthOrHeight = '20px'

    return `
      --icon-warning-background: center / ${widthOrHeight} no-repeat url("${warningIcon}");
      --icon-warning-height: ${widthOrHeight};
      --icon-warning-width: ${widthOrHeight}
    `
  }
}

export default LoadingSpinner
</script>

<style lang="scss" scoped>
@import './loading-spinner.scss';
</style>
