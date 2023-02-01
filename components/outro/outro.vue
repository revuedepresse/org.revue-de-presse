<template>
  <div id="project" class="outro">
    <h2
      class="outro__title outro__iconography-introducing"
      :style="introducingIcon"
    >
      À propos
    </h2>
    <p class="outro__paragraph">
      Revue de presse s'appuie sur l'API de Twitter (<a href="https://github.com/revuedepresse">github.com/revuedepresse</a>)
      et met en perspective les publications des médias en
      fonction du succès que ces publications ont rencontré auprès du public.
      Un classement s'appuyant sur les «retweets», offre chaque jour une visibilité sur 10 posts médias.
    </p>
    <h2
      class="outro__title outro__iconography-sharing"
      :style="sharingIcon"
    >
      @revue_2_presse
    </h2>
    <p class="outro__paragraph">
      Retrouver chaque jour les 3 tweets médias ayant été les plus relayés au cours de la journée.<br />
      <span
        class="outro__subscribe-to"
      ><!--
          --><a
        class="outro__subscribe-to-anchor"
        href="https://twitter.com/revue_2_presse"
      ><!--
            --><svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="twitter"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="outro__icon svg-inline--fa fa-twitter"
              >
                <path
                      fill="currentColor"
                      d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                      class=""
                >
                </path>
              </svg>
              <span class="outro__subscription-label">Suivre&nbsp;@revue_2_presse</span><!--
        --></a><!--
      --></span>
    </p>
    <h2
      class="outro__title outro__iconography-funding"
      :style="fundingIcon"
    >
      Pro bono publico
    </h2>
    <p class="outro__paragraph">
      Ce projet est porté avec 💙 par <a href="https://twitter.com/sylvaineg">@sylvaineg</a> et
      <a href="https://twitter.com/thierrymarianne">@thierrymarianne</a>.<br /><br />
      <a href="/mentions-legales/">Mentions Légales</a><br /><br />
      Depuis la naissance du projet en 2015 jusqu'en 2022,
      Revue de presse n'a reçu aucun financement extérieur.
      C'est pourquoi afin de pérenniser la maintenance et les développements du projet,
      des pages de contribution ont été ouvertes :<br>
    </p>
    <ul class="outro__list">
      <li><a href="https://www.buymeacoffee.com/thierrymarianne">buymeacoffee.com</a></li>
      <li><a href="https://ko-fi.com/thierrymarianne/">ko-fi.com</a></li>
      <li><a href="https://liberapay.com/thierrymarianne/">liberapay.com</a></li>
      <li><a href="https://github.com/sponsors/thierrymarianne">github.com</a></li>
    </ul>
    <p class="outro__paragraph">
      Dans le cadre de leurs programmes respectifs de soutien aux projets dont le code source est ouvert et libre,
      Revue de presse est hébergé par <a target="_blank" href="https://www.netlify.com/legal/open-source-policy/">netlify</a>
      et <a href="https://jb.gg/OpenSourceSupport" target="_blank">Jetbrains</a> met à notre disposition ses éditeurs.<br />
      <a href="https://jb.gg/OpenSourceSupport" target="_blank"><img
        alt="Revue de Presse logo"
        width="48"
        height="48"
        :src="vendorLogo"
      ></a>
    </p>
    <div class="outro__copyright-footer">
      <div class="outro__copyright">
        &copy; {{ year }} · Design de <!--
      --><a
        class="outro__outer-link"
        href="https://twitter.com/CcelestinC"
        >@CcelestinC</a><!--
    -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import IntroducingIcon from '../../assets/icons/icon-introducing.svg'
import SharingIcon from '../../assets/icons/icon-sharing.svg'
import FundingIcon from '../../assets/icons/icon-funding.svg'
import DateMixin from '~/mixins/date'
import VendorLogo from '~/assets/sponsors/jetbrains-logo.svg?data'

@Component
class Outro extends mixins(DateMixin) {
  get year () {
    return this.now().getFullYear()
  }

  get vendorLogo () {
    return VendorLogo
  }

  get fundingIcon () {
    const width = '18px'
    const height = '20px'

    return `--icon-funding-background: center / ${width} ${height} no-repeat url("${FundingIcon}");
        --icon-funding-height: ${height};
        --icon-funding-width: ${width}
      `
  }

  get introducingIcon () {
    const width = '22px'
    const height = '15px'

    return `--icon-introducing-background: center / ${width} ${height} no-repeat url("${IntroducingIcon}");
      --icon-introducing-height: ${height};
      --icon-introducing-width: ${width}
    `
  }

  get sharingIcon () {
    const width = '20px'
    const height = '18px'

    return `--icon-sharing-background: center / ${width} ${height} no-repeat url("${SharingIcon}");
      --icon-sharing-height: ${height};
      --icon-sharing-width: ${width}
    `
  }
}

export default Outro
</script>

<style lang="scss" scoped>
@import 'outro';
</style>
