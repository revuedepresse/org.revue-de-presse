<template>
  <div id="project" class="outro">
    <h2
      class="outro__title outro__iconography-introducing"
      :style="introducingIcon"
    >
      À propos
    </h2>

    <p class="outro__paragraph">
      Revue de presse s'appuie sur l'API de Twitter (<a href="https://github.com/revuedepresse">revuedepresse/revue-de-presse.org</a>)
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
      Retrouver chaque jour les 3 tweets médias ayant été les plus relayés au cours de la journée.

      <span
        class="outro__subscribe-to"
      ><!--
          --><a
        href="https://twitter.com/revue_2_presse"
      ><!--
            --><font-awesome-icon
        :icon="['fab', 'twitter']"
      />
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
      Entre la naissance du projet en 2015 jusqu'en 2022,
      Revue de presse n'a reçu aucun financement extérieur.<br>
      De manière à rendre le projet plus soutenable avec des coûts de maintenance grandissant,
      des pages de contribution ont été ouvertes :<br>
    </p>

    <ul>
      <li><a href="https://www.buymeacoffee.com/thierrymarianne">buymeacoffee.com/thierrymarianne/</a></li>
      <li><a href="https://ko-fi.com/thierrymarianne/">ko-fi.com/thierrymarianne/</a></li>
      <li><a href="https://liberapay.com/thierrymarianne/">liberapay.com/thierrymarianne/</a></li>
      <li><a href="https://github.com/sponsors/thierrymarianne">github.com/sponsors/thierrymarianne/</a></li>
    </ul>

    <p class="outro__paragraph">
      Ce projet est porté par <a href="https://twitter.com/sylvaineg">@sylvaineg</a> et <a
        href="https://twitter.com/thierrymarianne"
      >@thierrymarianne</a>.
    </p>

    <div class="outro__copyright-footer">
      <div class="outro__copyright">
        &copy;2021 · Design by <!--
      --><a
        class="outro__outer-link"
        href="https://twitter.com/CcelestinC"
        >@CcelestinC</a><!--
    -->
      </div>
    </div>
  </div>
</template>

<script>
import introducingIcon from '../../assets/icons/icon-introducing.svg'
import sharingIcon from '../../assets/icons/icon-sharing.svg'
import fundingIcon from '../../assets/icons/icon-funding.svg'

export default {
  name: 'Outro',
  computed: {
    fundingIcon () {
      const width = '18px'
      const height = '20px'

      return `--icon-funding-background: center / ${width} ${height} no-repeat url("${fundingIcon}");
          --icon-funding-height: ${height};
          --icon-funding-width: ${width}
        `
    },
    introducingIcon () {
      const width = '22px'
      const height = '15px'

      return `--icon-introducing-background: center / ${width} ${height} no-repeat url("${introducingIcon}");
        --icon-introducing-height: ${height};
        --icon-introducing-width: ${width}
      `
    },
    sharingIcon () {
      const width = '20px'
      const height = '18px'

      return `--icon-sharing-background: center / ${width} ${height} no-repeat url("${sharingIcon}");
        --icon-sharing-height: ${height};
        --icon-sharing-width: ${width}
      `
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'outro';
</style>
