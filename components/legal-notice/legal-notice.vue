<template>
  <div
    v-if="isShowingLegalNotice"
    class="legal-notice"
  >
    <h1>Mentions légales de revue-de-presse.org</h1>

    <p>En vigueur au 07/10/14</p>

    <p>
      Conformément aux dispositions des Articles 6-III et<br />
      19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique,
      dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs, ci-après l'"Utilisateur",
      du site {{ site }},<br />
      ci-après le "Site", les présentes mentions légales.<br />

      La connexion et la navigation sur le Site par l'Utilisateur implique acceptation intégrale et sans réserve des
      présentes mentions légales.
      <br />

      Ces dernières sont accessibles sur le Site à la rubrique « Mentions légales ».
    </p>

    <h2>ARTICLE 1 - L'EDITEUR</h2>

    <p>
      L'édition et la direction de la publication du Site est assurée par <br />
      {{ editor }},<br />
      dont l'adresse e-mail est<br />
      {{ email }}<br />
      ci-après l'"Editeur".
    </p>

    <h2>ARTICLE 2 - HEBERGEURS</h2>

    <p>
      Les hébergeur du Site sont la société SCALEWAY, dont le siège social est situé au<br />
      8 rue de la Ville l'Evêque, 75008 Paris, <br />
      avec le numéro de téléphone : +33 (0)1 84 13 00 00<br />
      ainsi que la société Netlify situé au<br />
      44 Montgomery Street, Suite 300, San Francisco, California 94104, dont l'adresse de support est
      support@netlify.com
    </p>

    <h2>ARTICLE 3 - ACCES AU SITE</h2>

    <p>
      Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et
      pouvant découlant d'une nécessité de maintenance.<br />

      En cas de modification, interruption ou suspension du Site,<br />

      l'Editeur ne saurait être tenu responsable.
    </p>

    <h2>ARTICLE 4 - COLLECTE DES DONNEES</h2>

    <p>
      Le Site est exempté de déclaration à la Commission Nationale Informatique et Libertés (CNIL) dans la mesure où il
      ne collecte aucune donnée concernant les utilisateurs.<br />

      Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site, sans
      autorisation de l'Editeur est prohibée
      et pourra entraînée des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété
      intellectuelle et le Code civil.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
class LegalNotice extends Vue {
  get isShowingLegalNotice () {
    return this.$route.name === 'legal-notice'
  }

  get editor () {
    return atob('U3lsdmFpbmUgR2FyZGVyZXQgZXQgVGhpZXJyeSBNYXJpYW5uZQ==')
  }

  get site () {
    return 'https://revue-de-presse.org'
  }

  get email () {
    return atob('Y29udGFjdCBbY2hlel0gcmV2dWUgW3RpcmV0XSBkZSBbdGlyZXRdIHByZXNzZSBbcG9pbnRdIG9yZw==')
  }
}

export default LegalNotice
</script>

<style lang="scss" scoped>
@import 'legal-notice';
</style>
