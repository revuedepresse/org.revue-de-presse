<template>
  <div
    v-if="isShowingSupportPage"
    class="support"
  >
    <h1>Nous soutenir</h1>
    <h2>Projet citoyen, ouvert et libre</h2>
    <p>
      Revue de presse s'appuie sur l'API de Bluesky
      et relaie des brèves de presse en provenance exclusive de médias Français
      d'après le succès rencontré par ses brèves auprès du public.
    </p>
    <p>
      En effet, un classement s'appuyant sur les «retweets», offre chaque jour une visibilité sur 10 posts médias.
    </p>
    <p>
      L'intégralité du code source du projet est proposé sous licence libre (GNU General Public License v3.0) et est hébergée
      par l'organisation «Revue&nbsp;de&nbsp;Presse»&nbsp;:<br />
      <a
        :style="gitHubIcon"
        class="support__external-link support__iconography-github"
        href="https://github.com/revuedepresse"
        rel="noreferrer nofollow noopener"
      ><!--
        -->github.com/revuedepresse<!--
      --></a>
    </p>
    <h2>Soyez partie prenante du projet</h2>
    <p>
      <span class="support--bold">Contribuez directement au <a href="https://revue-de-presse.org">projet</a></span>
      en nous offrant de la visibilité autour de vous lorsque vous :
    </p>
    <ul>
      <li>
        vous abonnez à @revue_2_presse depuis
        <ul>
          <li>
            <a href="https://tiktok.com/@revue_2_presse">TikTok</a>
          </li>
          <li>
            <a href="https://bsky.app/profile/revue-de-presse.org">Bluesky</a>
          </li>
        </ul>
      </li>
      <li>
        «likez», «republiez», mettez en favoris ou commentez les revues qui vous paraissent pertinentes depuis&nbsp;:
        <ul>
          <li>
            <a href="https://tiktok.com/@revue_2_presse">TikTok</a>
          </li>
          <li>
            <a href="https://bsky.app/profile/revue-de-presse.org">Bluesky</a>
          </li>
        </ul>
      </li>
      <li>
        évaluez l'app depuis le Play Store:<br />
        <a href="https://play.google.com/store/apps/details?id=org.revue_de_presse">Revue de Presse pour appareils Android</a>
      </li>
    </ul>

    <p>ou encore lorsque vous</p>

    <ul>
      <li>
        nous écrivez à <a href="mailto:bug@revue-de-presse.org">bug@revue-de-presse.org</a>
        après avoir identifié des bugs de l'application web ou mobile 🐞 ou
      </li>
      <li>
        nous suggérez de nouveaux médias de la presse française pas encore référencés depuis la page <a href="/sources">Sources des brèves</a>.
      </li>
    </ul>
    <h2>Financement</h2>
    <p>
      Depuis la naissance du projet en 2015,
      Revue de presse n'a reçu aucun financement extérieur.
      Avec la volonté de rendre l'absorption des coûts de maintenance et de développement du projet plus soutenable,
      des pages de contribution ont été ouvertes :<br>
    </p>
    <ul class="support__list">
      <li><a href="https://www.buymeacoffee.com/thierrymarianne" rel="noreferrer nofollow noopener">buymeacoffee.com</a></li>
      <li><a href="https://github.com/sponsors/thierrymarianne" rel="noreferrer nofollow noopener">github.com</a></li>
    </ul>
    <h2>Programmes open-source</h2>
    <p class="support__paragraph">
      Dans le cadre de leurs programmes respectifs de soutien aux projets dont le code source est ouvert et libre,
      Revue de presse est hébergé par <a target="_blank" href="https://www.netlify.com/legal/open-source-policy/" rel="noreferrer nofollow noopener">netlify</a>
      à titre gracieux.<br />
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GitHubIcon from '../../assets/icons/icon-github.svg'
import VendorLogo from '~/assets/sponsors/jetbrains-logo.png?data'

@Component
class SupportPage extends Vue {
  get gitHubIcon () {
    const width = '10px'
    const height = '10px'

    return `--icon-github-background: center / ${width} ${height} no-repeat url("${GitHubIcon}");
      --icon-github-height: ${height};
      --icon-github-width: ${width}
    `
  }

  get isShowingSupportPage () {
    return this.$route.name === 'support'
  }

  get vendorLogo () {
    return VendorLogo
  }
}

export default SupportPage
</script>

<style lang="scss" scoped>
@import 'support';
</style>
