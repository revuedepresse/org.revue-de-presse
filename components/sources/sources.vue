<template>
  <div
    v-if="showingSourceContents"
    ref="sources"
    class="sources"
  >
    <h1 v-if="showingSourcesPage">
      Sources des brèves
    </h1>
    <p v-if="showingSourcesPage">
      Les sources des brèves de publications <a href="#footnote" class="sources__internal-link">triées par popularité</a> en fin de chaque journée
      proviennent des comptes Bluesky de médias Français.
    </p>
    <p
      v-if="showingSourcesPage"
      id="footnote"
      class="sources__footnote"
    >
      La popularité est déduite des partages des publications depuis Bluesky.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import SourcesMixin, { Source } from '~/mixins/sources'
import ApiMixin from '~/mixins/api'

@Component
class SourcesPage extends mixins(ApiMixin, SourcesMixin) {
  $refs!: {
    list: HTMLElement,
    [key: string]: any
  }

  get sources () {
    const sortedSources: Source[] = this.sortedSources

    if (this.$route.name === 'source' && this.$route.params.twitterId) {
      const twitterId: number = parseInt(this.$route.params.twitterId, 10)
      const filteredSource = sortedSources.find(s => s.twitterId === twitterId)

      if (!filteredSource) {
        return []
      }

      return [filteredSource]
    }

    return sortedSources
  }

  formatExternalUrl (username: string) {
    return `https://twitter.com/${username}`
  }

  formatId (username: string) {
    return `source__${username}`
  }

  scrollIntoView () {
    if (!this.showingSourceContents) {
      return
    }

    const target = window.location.href.replace(/.+#/, '')

    const selectedItem: HTMLElement|null = this.$refs.sources.querySelector(
      `[id="${target}"]`
    )

    if (selectedItem === null) {
      return
    }

    if (target !== 'footnote') {
      Array.from(document.querySelectorAll('h2'))
        .map(subtitle => subtitle.classList.remove('sources__target'))

      selectedItem.classList.add('sources__target')
    }

    selectedItem.scrollIntoView({ block: 'center' })
  }

  mounted () {
    this.scrollIntoView()
  }

  updated () {
    this.scrollIntoView()
  }
}

export default SourcesPage
</script>

<style lang="scss" scoped>
@import 'sources';
</style>
