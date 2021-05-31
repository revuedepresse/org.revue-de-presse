<template>
  <div
    class="vanity-metric"
  >
    <LikeMetricIcon
      v-if="metricType === 'like'"
      :class="iconClass"
    />
    <RetweetIcon
      v-else
      :class="iconClass"
    />
    <span
      :class="countClasses"
    >{{ count }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LikeMetricIcon from '~/assets/icons/icon-like-metric.svg?inline'
import RetweetIcon from '~/assets/icons/icon-retweet.svg?inline'

@Component({
  components: { LikeMetricIcon, RetweetIcon }
})
export default class VanityMetric extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  count!: number

  @Prop({
    type: String,
    required: true
  })
  metricType!: string

  get color (): string {
    return `var(--background-vanity-metric-${this.metricType.toLowerCase()})`
  }

  get iconClass (): string {
    if (this.metricType === 'retweet') {
      return 'vanity-metric__retweet'
    }

    return 'vanity-metric__like'
  }

  get countClasses (): {[key: string]: boolean} {
    const classes: {[key: string]: boolean} = {
      'vanity-metric__count': true,
      'vanity-metric__count--retweet': false,
      'vanity-metric__count--like': false
    }

    if (this.metricType === 'retweet') {
      classes['vanity-metric__count--retweet'] = true
    }

    if (this.metricType === 'like') {
      classes['vanity-metric__count--like'] = true
    }

    return classes
  }
}
</script>

<style lang="scss" scoped>
@import './vanity-metric.scss';
</style>
