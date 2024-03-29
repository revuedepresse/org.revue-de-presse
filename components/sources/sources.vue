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
      Les sources des brèves de publications <a href="#footnote" class="sources__internal-link">triées chaque jour par popularité</a> proviennent des comptes Twitter des médias Français, ayant été classés par ordre lexico-graphique ci-dessous :
    </p>
    <div
      v-for="source in sources"
      :key="source.username"
      :data-key="source.username"
      class="sources__item"
    >
      <h2
        v-if="showingSourcesPage"
        :id="formatId(source.username)"
      >
        {{ source.name }}
      </h2>
      <h1
        v-else
        :id="formatId(source.username)"
        class="sources__target"
      >
        {{ source.name }}
      </h1>
      <ul class="sources__media">
        <li class="sources__source">
          <span class="sources__external-link-container">
            <a
              class="sources__external-link"
              rel="noreferer nofollow noopener"
              :href="source.url"
            >
              {{ source.url }}
            </a>
          </span>
        </li>
        <li class="sources__source">
          <span class="sources__external-link-container">
            <a
              class="sources__external-link"
              rel="noreferer nofollow noopener"
              :href="formatExternalUrl(source.username)"
            >
              @{{ source.username }}
            </a>
          </span>
        </li>
      </ul>
    </div>
    <p
      v-if="showingSourcesPage"
      id="footnote"
      class="sources__footnote"
    >
      <sup>*</sup> La popularité est dérivée du nombre de RTs des publications depuis Twitter
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
