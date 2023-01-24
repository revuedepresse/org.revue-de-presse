<template>
  <div
    v-if="isVisible"
    class="modal-window"
    @click="hide"
  >
    <img
      :src="mediaUrl"
      class="modal-window__image"
    >
    <div
      class="modal-window-overlay"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { css } from '@emotion/css'
import EventHub from '../../modules/event-hub'
import { Media } from '~/mixins/status-format'

@Component
class ModalWindow extends Vue {
  isVisible: boolean = false
  mediaStyle: string = ''
  mediaUrl: string = ''
  overflowStyle: string = ''
  noOverflowStyle: string = ''
  body?: HTMLBodyElement

  mounted () {
    EventHub.$on('modal_window.show_intended', this.show)
    this.noOverflowStyle = css`
      overflow-y: hidden;
    `
    this.overflowStyle = css`
      overflow-y: auto;
    `

    const body = document.querySelector('body')

    if (body !== null) {
      this.body = body
    }
  }

  show ({ media }: { media: Media}) {
    this.mediaUrl = media.url

    if (this.body !== undefined) {
      this.body.classList.remove(this.overflowStyle)
      this.body.classList.add(this.noOverflowStyle)
      this.body.classList.add('containing-modal-window')
    }

    this.isVisible = true
  }

  hide () {
    this.isVisible = false

    if (this.body !== undefined) {
      this.body.classList.remove(this.noOverflowStyle)
      this.body.classList.add(this.overflowStyle)
      this.body.classList.remove('containing-modal-window')
    }

    this.mediaUrl = ''
  }
}

export default ModalWindow
</script>

<style lang="scss" scoped>
@import './modal-window.scss';
</style>
