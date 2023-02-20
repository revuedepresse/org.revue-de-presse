<template>
  <a
    class="publication-date"
    rel="nofollow noreferrer noopener"
    :href="publicationUrl">
    {{ publicationDate }}
  </a>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import DateMixin from '~/mixins/date'

@Component
export default class PublicationDate extends mixins(DateMixin) {
  @Prop({
    type: Date,
    required: true
  })
    date!: Date

  @Prop({
    type: String,
    required: true
  })
    publicationUrl!: string

  get time () {
    return this.date
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      .toUpperCase()
  }

  get dayOfTheMonth () {
    return this.date.getDate()
  }

  get month () {
    return `${this.getMonths[this.date.getMonth()].substring(0, 3)}.`.toLowerCase()
  }

  get year () {
    return this.date.getFullYear()
  }

  get publicationDate () {
    return `${this.time} · ${this.dayOfTheMonth} ${this.month} ${this.year}`
  }
}
</script>

<style lang="scss" scoped>
@import './publication-date.scss';
</style>
