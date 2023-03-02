<template>
  <div
    v-if="isShowingSourcesPage"
    ref="sources"
    class="sources"
  >
    <h1>Sources</h1>
    <p>
      Les sources des brèves de publications <a href="#footnote" class="sources__internal-link">triées chaque jour par popularité</a> proviennent des comptes Twitter des médias Français, ayant été classés par ordre lexico-graphique ci-dessous :
    </p>
    <h2 id="source_20minutes">
      20 Minutes
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.20minutes.fr/" rel="noreferer nofollow noopener">https://www.20minutes.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/20minutes" rel="noreferer nofollow noopener">@20minutes</a>
        </span>
      </li>
    </ul>
    <h2 id="source_28minutes">
      28 minutes
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://arte.tv/28minutes" rel="noreferer nofollow noopener">https://arte.tv/28minutes</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/28minutes" rel="noreferer nofollow noopener">@28minutes</a>
        </span>
      </li>
    </ul>
    <h2 id="source_afpfr">
      Agence France-Presse
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.afp.com/" rel="noreferer nofollow noopener">https://www.afp.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/afpfr" rel="noreferer nofollow noopener">@afpfr</a>
        </span>
      </li>
    </ul>
    <h2 id="source_aleteiafr">
      Aleteia
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://fr.aleteia.org/" rel="noreferer nofollow noopener">https://fr.aleteia.org/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/aleteiafr" rel="noreferer nofollow noopener">@aleteiafr</a>
        </span>
      </li>
    </ul>
    <h2 id="source_altereco_">
      Alternatives Économiques
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.alternatives-economiques.fr/" rel="noreferer nofollow noopener">https://www.alternatives-economiques.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/altereco_" rel="noreferer nofollow noopener">@altereco_</a>
        </span>
      </li>
    </ul>
    <h2 id="source_arretsurimages">
      Arrêt sur images
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.arretsurimages.net/" rel="noreferer nofollow noopener">https://www.arretsurimages.net/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/arretsurimages" rel="noreferer nofollow noopener">@arretsurimages</a>
        </span>
      </li>
    </ul>
    <h2 id="source_artefr">
      ARTE
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.arte.tv/" rel="noreferer nofollow noopener">https://www.arte.tv/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/artefr" rel="noreferer nofollow noopener">@artefr</a>
        </span>
      </li>
    </ul>
    <h2 id="source_bastamedia_">
      Basta!
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.basta.media/" rel="noreferer nofollow noopener">https://www.basta.media/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/bastamedia_" rel="noreferer nofollow noopener">@bastamedia_</a>
        </span>
      </li>
    </ul>
    <h2 id="source_bfmtv">
      BFMTV
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.bfmtv.com/" rel="noreferer nofollow noopener">https://www.bfmtv.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/bfmtv" rel="noreferer nofollow noopener">@bfmtv</a>
        </span>
      </li>
    </ul>
    <h2 id="source_blast_france">
      BLAST
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.blast-info.fr/" rel="noreferer nofollow noopener">https://www.blast-info.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/blast_france" rel="noreferer nofollow noopener">@blast_france</a>
        </span>
      </li>
    </ul>
    <h2 id="source_brutofficiel">
      Brut FR
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.brut.media/" rel="noreferer nofollow noopener">https://www.brut.media/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/brutofficiel" rel="noreferer nofollow noopener">@brutofficiel</a>
        </span>
      </li>
    </ul>
    <h2 id="source_canardenchaine">
      Le Canard enchaîné
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lecanardenchaine.fr/" rel="noreferer nofollow noopener">https://www.lecanardenchaine.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/canardenchaine" rel="noreferer nofollow noopener">@canardenchaine</a>
        </span>
      </li>
    </ul>
    <h2 id="source_causettelemag">
      CausetteLeMag
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.causette.fr/" rel="noreferer nofollow noopener">https://www.causette.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/causettelemag" rel="noreferer nofollow noopener">@causettelemag</a>
        </span>
      </li>
    </ul>
    <h2 id="source_contexte">
      Contexte
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.contexte.com/" rel="noreferer nofollow noopener">https://www.contexte.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/contexte" rel="noreferer nofollow noopener">@contexte</a>
        </span>
      </li>
    </ul>
    <h2 id="source_courrierpicard">
      Courrier picard
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.courrier-picard.fr/" rel="noreferer nofollow noopener">https://www.courrier-picard.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/courrierpicard" rel="noreferer nofollow noopener">@courrierpicard</a>
        </span>
      </li>
    </ul>
    <h2 id="source_decodeurs">
      Les Décodeurs
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lemonde.fr/les-decodeurs/" rel="noreferer nofollow noopener">https://www.lemonde.fr/les-decodeurs/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/decodeurs" rel="noreferer nofollow noopener">@decodeurs</a>
        </span>
      </li>
    </ul>
    <h2 id="source_echosenergie">
      LesEchosEnergie
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lesechos.fr/" rel="noreferer nofollow noopener">https://www.lesechos.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/echosenergie" rel="noreferer nofollow noopener">@echosenergie</a>
        </span>
      </li>
    </ul>
    <h2 id="source_europe1">
      Europe
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.europe1.fr/" rel="noreferer nofollow noopener">https://www.europe1.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/europe1" rel="noreferer nofollow noopener">@europe1</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3alpes">
      France 3 Alpes
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france3-regions.francetvinfo.fr/auvergne-rhone-alpes/" rel="noreferer nofollow noopener">https://france3-regions.francetvinfo.fr/auvergne-rhone-alpes/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3alpes" rel="noreferer nofollow noopener">@f3alpes</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3alsace">
      France 3 Alsace
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france3-regions.francetvinfo.fr/alsace/" rel="noreferer nofollow noopener">https://france3-regions.francetvinfo.fr/alsace/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3alsace" rel="noreferer nofollow noopener">@f3alsace</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3aquitaine">
      France 3 Aquitaine
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france3-regions.francetvinfo.fr/nouvelle-aquitaine/" rel="noreferer nofollow noopener">https://france3-regions.francetvinfo.fr/nouvelle-aquitaine/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3aquitaine" rel="noreferer nofollow noopener">@f3aquitaine</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3bourgogne">
      France 3 Bourgogne
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://bfc.france3.fr/" rel="noreferer nofollow noopener">https://bfc.france3.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3bourgogne" rel="noreferer nofollow noopener">@f3bourgogne</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3centre">
      France 3 Centre-Val de Loire
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://cvdl.france3.fr/" rel="noreferer nofollow noopener">https://cvdl.france3.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3centre" rel="noreferer nofollow noopener">@f3centre</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3euskalherri">
      France3 Euskal Herri Pays Basque
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france3-regions.francetvinfo.fr/nouvelle-aquitaine/" rel="noreferer nofollow noopener">https://france3-regions.francetvinfo.fr/nouvelle-aquitaine/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3euskalherri" rel="noreferer nofollow noopener">@f3euskalherri</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3franchecomte">
      France 3 Franche-Comté
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://bfc.france3.fr/" rel="noreferer nofollow noopener">https://bfc.france3.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3franchecomte" rel="noreferer nofollow noopener">@f3franchecomte</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3limousin">
      France 3 Limousin
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://na.france3.fr/" rel="noreferer nofollow noopener">https://na.france3.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3limousin" rel="noreferer nofollow noopener">@f3limousin</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3lorraine">
      France 3 Lorraine
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france3-regions.francetvinfo.fr/grand-est/" rel="noreferer nofollow noopener">https://france3-regions.francetvinfo.fr/grand-est/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3lorraine" rel="noreferer nofollow noopener">@f3lorraine</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3nord">
      France 3 Nord Pas-de-Calais
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france3-regions.francetvinfo.fr/hauts-de-france/" rel="noreferer nofollow noopener">https://france3-regions.francetvinfo.fr/hauts-de-france/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3nord" rel="noreferer nofollow noopener">@f3nord</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3occitanielr">
      France 3 Occitanie
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france3-regions.francetvinfo.fr/occitanie/" rel="noreferer nofollow noopener">https://france3-regions.francetvinfo.fr/occitanie/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3occitanielr" rel="noreferer nofollow noopener">@f3occitanielr</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3paysdelaloire">
      France 3 Pays de la Loire
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://pdl.france3.fr/" rel="noreferer nofollow noopener">https://pdl.france3.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3paysdelaloire" rel="noreferer nofollow noopener">@f3paysdelaloire</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3picardie">
      France 3 Picardie
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://linktr.ee/france3picardie" rel="noreferer nofollow noopener">https://linktr.ee/france3picardie</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3picardie" rel="noreferer nofollow noopener">@f3picardie</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3poitouchtes">
      France 3 Poitou-Charentes
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://na.france3.fr/" rel="noreferer nofollow noopener">https://na.france3.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3poitouchtes" rel="noreferer nofollow noopener">@f3poitouchtes</a>
        </span>
      </li>
    </ul>
    <h2 id="source_f3rhone_alpes">
      France 3 Rhône-Alpes
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france3-regions.francetvinfo.fr/auvergne-rhone-alpes/" rel="noreferer nofollow noopener">https://france3-regions.francetvinfo.fr/auvergne-rhone-alpes/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/f3rhone_alpes" rel="noreferer nofollow noopener">@f3rhone_alpes</a>
        </span>
      </li>
    </ul>
    <h2 id="source_figarotech">
      Le FigaroTech
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lefigaro.fr/secteur/high-tech/" rel="noreferer nofollow noopener">https://www.lefigaro.fr/secteur/high-tech/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/figarotech" rel="noreferer nofollow noopener">@figarotech</a>
        </span>
      </li>
    </ul>
    <h2 id="source_france24">
      FRANCE 24
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.france24.com/" rel="noreferer nofollow noopener">https://www.france24.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/france24" rel="noreferer nofollow noopener">@france24</a>
        </span>
      </li>
    </ul>
    <h2 id="source_france2tv">
      France 2
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.france.tv/france-2" rel="noreferer nofollow noopener">https://www.france.tv/france-2</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/france2tv" rel="noreferer nofollow noopener">@france2tv</a>
        </span>
      </li>
    </ul>
    <h2 id="source_france3bretagne">
      France 3 Bretagne
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france3-regions.francetvinfo.fr/bretagne/" rel="noreferer nofollow noopener">https://france3-regions.francetvinfo.fr/bretagne/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/france3bretagne" rel="noreferer nofollow noopener">@france3bretagne</a>
        </span>
      </li>
    </ul>
    <h2 id="source_france3ca">
      France 3 Champagne-Ardenne
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://grandest.france3.fr/" rel="noreferer nofollow noopener">https://grandest.france3.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/france3ca" rel="noreferer nofollow noopener">@france3ca</a>
        </span>
      </li>
    </ul>
    <h2 id="source_france3tv">
      France 3
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.france.tv/france-3/" rel="noreferer nofollow noopener">https://www.france.tv/france-3/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/france3tv" rel="noreferer nofollow noopener">@france3tv</a>
        </span>
      </li>
    </ul>
    <h2 id="source_france5tv">
      France 5
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france.tv/france-5" rel="noreferer nofollow noopener">https://france.tv/france-5</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/france5tv" rel="noreferer nofollow noopener">@france5tv</a>
        </span>
      </li>
    </ul>
    <h2 id="source_franceculture">
      France Culture
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.franceculture.fr/" rel="noreferer nofollow noopener">https://www.franceculture.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/franceculture" rel="noreferer nofollow noopener">@franceculture</a>
        </span>
      </li>
    </ul>
    <h2 id="source_franceinfo">
      franceinfo
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://franceinfo.fr/" rel="noreferer nofollow noopener">https://franceinfo.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/franceinfo" rel="noreferer nofollow noopener">@franceinfo</a>
        </span>
      </li>
    </ul>
    <h2 id="source_franceinfo_cult">
      franceinfo culture
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.franceinfo.fr/culture" rel="noreferer nofollow noopener">https://www.franceinfo.fr/culture</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/franceinfo_cult" rel="noreferer nofollow noopener">@franceinfo_cult</a>
        </span>
      </li>
    </ul>
    <h2 id="source_franceinfoplus">
      franceinfo plus
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.franceinfo.fr/" rel="noreferer nofollow noopener">https://www.franceinfo.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/franceinfoplus" rel="noreferer nofollow noopener">@franceinfoplus</a>
        </span>
      </li>
    </ul>
    <h2 id="source_franceinter">
      France Inter
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.franceinter.fr/" rel="noreferer nofollow noopener">https://www.franceinter.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/franceinter" rel="noreferer nofollow noopener">@franceinter</a>
        </span>
      </li>
    </ul>
    <h2 id="source_frustration_web">
      Frustration
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.frustrationmagazine.fr/" rel="noreferer nofollow noopener">https://www.frustrationmagazine.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/frustration_web" rel="noreferer nofollow noopener">@frustration_web</a>
        </span>
      </li>
    </ul>
    <h2 id="source_ftviastella">
      France 3 Corse
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://france3-regions.francetvinfo.fr/corse/" rel="noreferer nofollow noopener">https://france3-regions.francetvinfo.fr/corse/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/ftviastella" rel="noreferer nofollow noopener">@ftviastella</a>
        </span>
      </li>
    </ul>
    <h2 id="source_humanite_fr">
      L'Humanité
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.humanite.fr/" rel="noreferer nofollow noopener">https://www.humanite.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/humanite_fr" rel="noreferer nofollow noopener">@humanite_fr</a>
        </span>
      </li>
    </ul>
    <h2 id="source_jdaofficiel">
      Le Journal des Arts
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lejournaldesarts.fr/" rel="noreferer nofollow noopener">https://www.lejournaldesarts.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/jdaofficiel" rel="noreferer nofollow noopener">@jdaofficiel</a>
        </span>
      </li>
    </ul>
    <h2 id="source_jdnebusiness">
      Journal du Net
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.journaldunet.com/" rel="noreferer nofollow noopener">https://www.journaldunet.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/jdnebusiness" rel="noreferer nofollow noopener">@jdnebusiness</a>
        </span>
      </li>
    </ul>
    <h2 id="source_kaizenmag">
      Kaizen
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://kaizen-magazine.com/" rel="noreferer nofollow noopener">https://kaizen-magazine.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/kaizenmag" rel="noreferer nofollow noopener">@kaizenmag</a>
        </span>
      </li>
    </ul>
    <h2 id="source_konbinifr">
      Konbini
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.konbini.com/" rel="noreferer nofollow noopener">https://www.konbini.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/konbinifr" rel="noreferer nofollow noopener">@konbinifr</a>
        </span>
      </li>
    </ul>
    <h2 id="source_konbininews">
      Konbini news
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://news.konbini.com/" rel="noreferer nofollow noopener">https://news.konbini.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/konbininews" rel="noreferer nofollow noopener">@konbininews</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lacroix">
      La Croix
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.la-croix.com/" rel="noreferer nofollow noopener">https://www.la-croix.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lacroix" rel="noreferer nofollow noopener">@lacroix</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lamatinalelci">
      La Matinale LCI
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.tf1info.fr/emission/les-matins-lci-11803/" rel="noreferer nofollow noopener">https://www.tf1info.fr/emission/les-matins-lci-11803/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lamatinalelci" rel="noreferer nofollow noopener">@lamatinalelci</a>
        </span>
      </li>
    </ul>
    <h2 id="source_laprovence">
      La Provence
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.laprovence.com/" rel="noreferer nofollow noopener">https://www.laprovence.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/laprovence" rel="noreferer nofollow noopener">@laprovence</a>
        </span>
      </li>
    </ul>
    <h2 id="source_latribune">
      La Tribune
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.latribune.fr/" rel="noreferer nofollow noopener">https://www.latribune.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/latribune" rel="noreferer nofollow noopener">@latribune</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lavoixdunord">
      La Voix du Nord
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lavoixdunord.fr/" rel="noreferer nofollow noopener">https://www.lavoixdunord.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lavoixdunord" rel="noreferer nofollow noopener">@lavoixdunord</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lci">
      LCI
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://tf1info.fr/" rel="noreferer nofollow noopener">https://tf1info.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lci" rel="noreferer nofollow noopener">@lci</a>
        </span>
      </li>
    </ul>
    <h2 id="source_le1hebdo">
      Le 1
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.le1hebdo.fr/" rel="noreferer nofollow noopener">https://www.le1hebdo.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/le1hebdo" rel="noreferer nofollow noopener">@le1hebdo</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lebondyblog">
      Le Bondy Blog
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.bondyblog.fr/" rel="noreferer nofollow noopener">https://www.bondyblog.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lebondyblog" rel="noreferer nofollow noopener">@lebondyblog</a>
        </span>
      </li>
    </ul>
    <h2 id="source_ledauphine">
      Le Dauphiné Libéré
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.ledauphine.com/" rel="noreferer nofollow noopener">https://www.ledauphine.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/ledauphine" rel="noreferer nofollow noopener">@ledauphine</a>
        </span>
      </li>
    </ul>
    <h2 id="source_le_figaro">
      Le Figaro
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lefigaro.fr/" rel="noreferer nofollow noopener">https://www.lefigaro.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/le_figaro" rel="noreferer nofollow noopener">@le_figaro</a>
        </span>
      </li>
    </ul>
    <h2 id="source_legrandjury">
      Le Grand Jury
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.rtl.fr/emission/le-grand-jury" rel="noreferer nofollow noopener">https://www.rtl.fr/emission/le-grand-jury</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/legrandjury" rel="noreferer nofollow noopener">@legrandjury</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lehuffpost">
      Le HuffPost
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.huffingtonpost.fr/" rel="noreferer nofollow noopener">https://www.huffingtonpost.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lehuffpost" rel="noreferer nofollow noopener">@lehuffpost</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lejdd">
      Le JDD
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://offres.lejdd.fr/abonnement" rel="noreferer nofollow noopener">https://offres.lejdd.fr/abonnement</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lejdd" rel="noreferer nofollow noopener">@lejdd</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lemediatv">
      Le Média
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lemediatv.fr/" rel="noreferer nofollow noopener">https://www.lemediatv.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lemediatv" rel="noreferer nofollow noopener">@lemediatv</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lemondefr">
      Le Monde
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lemonde.fr/" rel="noreferer nofollow noopener">https://www.lemonde.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lemondefr" rel="noreferer nofollow noopener">@lemondefr</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lemonde_pol">
      Le Monde Politique
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lemonde.fr/politique/" rel="noreferer nofollow noopener">https://www.lemonde.fr/politique/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lemonde_pol" rel="noreferer nofollow noopener">@lemonde_pol</a>
        </span>
      </li>
    </ul>
    <h2 id="source_le_parisien">
      Le Parisien
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.leparisien.fr/" rel="noreferer nofollow noopener">https://www.leparisien.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/le_parisien" rel="noreferer nofollow noopener">@le_parisien</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lepoint">
      Le Point
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lepoint.fr/" rel="noreferer nofollow noopener">https://www.lepoint.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lepoint" rel="noreferer nofollow noopener">@lepoint</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lerepu">
      Le Républicain Lorrain
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.republicain-lorrain.fr/" rel="noreferer nofollow noopener">https://www.republicain-lorrain.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lerepu" rel="noreferer nofollow noopener">@lerepu</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lesechos">
      Les Echos
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lesechos.fr/" rel="noreferer nofollow noopener">https://www.lesechos.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lesechos" rel="noreferer nofollow noopener">@lesechos</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lesinrocks">
      Les Inrockuptibles
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lesinrocks.com/" rel="noreferer nofollow noopener">https://www.lesinrocks.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lesinrocks" rel="noreferer nofollow noopener">@lesinrocks</a>
        </span>
      </li>
    </ul>
    <h2 id="source_letelegramme">
      Le Télégramme
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.letelegramme.fr/" rel="noreferer nofollow noopener">https://www.letelegramme.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/letelegramme" rel="noreferer nofollow noopener">@letelegramme</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lexpress">
      L'Express
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.lexpress.fr/" rel="noreferer nofollow noopener">https://www.lexpress.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lexpress" rel="noreferer nofollow noopener">@lexpress</a>
        </span>
      </li>
    </ul>
    <h2 id="source_libe">
      Libération
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.liberation.fr/" rel="noreferer nofollow noopener">https://www.liberation.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/libe" rel="noreferer nofollow noopener">@libe</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lobs">
      L'Obs
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.nouvelobs.com/" rel="noreferer nofollow noopener">https://www.nouvelobs.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lobs" rel="noreferer nofollow noopener">@lobs</a>
        </span>
      </li>
    </ul>
    <h2 id="source_lvslmedia">
      Le Vent Se Lève
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://lvsl.fr/" rel="noreferer nofollow noopener">https://lvsl.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/lvslmedia" rel="noreferer nofollow noopener">@lvslmedia</a>
        </span>
      </li>
    </ul>
    <h2 id="source_marianne2fr">
      Magazine Marianne
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.marianne.net/" rel="noreferer nofollow noopener">https://www.marianne.net/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/marianne2fr" rel="noreferer nofollow noopener">@marianne2fr</a>
        </span>
      </li>
    </ul>
    <h2 id="source_mdiplo">
      Le Monde diplomatique
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.monde-diplomatique.fr/" rel="noreferer nofollow noopener">https://www.monde-diplomatique.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/mdiplo" rel="noreferer nofollow noopener">@mdiplo</a>
        </span>
      </li>
    </ul>
    <h2 id="source_mediapart">
      Mediapart
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.mediapart.fr/" rel="noreferer nofollow noopener">https://www.mediapart.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/mediapart" rel="noreferer nofollow noopener">@mediapart</a>
        </span>
      </li>
    </ul>
    <h2 id="source_mediapartvideos">
      Mediapart Vidéos
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.mediapart.fr/studio/videos" rel="noreferer nofollow noopener">https://www.mediapart.fr/studio/videos</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/mediapartvideos" rel="noreferer nofollow noopener">@mediapartvideos</a>
        </span>
      </li>
    </ul>
    <h2 id="source_nice_matin">
      Nice-Matin
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.nicematin.com/" rel="noreferer nofollow noopener">https://www.nicematin.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/nice_matin" rel="noreferer nofollow noopener">@nice_matin</a>
        </span>
      </li>
    </ul>
    <h2 id="source_ouestfrance">
      Ouest-France
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.ouest-france.fr/" rel="noreferer nofollow noopener">https://www.ouest-france.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/ouestfrance" rel="noreferer nofollow noopener">@ouestfrance</a>
        </span>
      </li>
    </ul>
    <h2 id="source_radiofrance">
      Radio France
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.radiofrance.com/" rel="noreferer nofollow noopener">https://www.radiofrance.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/radiofrance" rel="noreferer nofollow noopener">@radiofrance</a>
        </span>
      </li>
    </ul>
    <h2 id="source__reflets_">
      reflets.info
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://reflets.info/" rel="noreferer nofollow noopener">https://reflets.info/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/_reflets_" rel="noreferer nofollow noopener">@_reflets_</a>
        </span>
      </li>
    </ul>
    <h2 id="source_reporterre">
      Reporterre
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://reporterre.net/" rel="noreferer nofollow noopener">https://reporterre.net/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/reporterre" rel="noreferer nofollow noopener">@reporterre</a>
        </span>
      </li>
    </ul>
    <h2 id="source_rfi">
      RFI
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.rfi.fr/fr/" rel="noreferer nofollow noopener">https://www.rfi.fr/fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/rfi" rel="noreferer nofollow noopener">@rfi</a>
        </span>
      </li>
    </ul>
    <h2 id="source_rtlfrance">
      RTL France
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.rtl.fr/" rel="noreferer nofollow noopener">https://www.rtl.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/rtlfrance" rel="noreferer nofollow noopener">@rtlfrance</a>
        </span>
      </li>
    </ul>
    <h2 id="source_rue89">
      Rue89
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.nouvelobs.com/rue89/" rel="noreferer nofollow noopener">https://www.nouvelobs.com/rue89/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/rue89" rel="noreferer nofollow noopener">@rue89</a>
        </span>
      </li>
    </ul>
    <h2 id="source_socialter">
      Socialter
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://linktr.ee/socialter" rel="noreferer nofollow noopener">https://linktr.ee/socialter</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/socialter" rel="noreferer nofollow noopener">@socialter</a>
        </span>
      </li>
    </ul>
    <h2 id="source_tdgch">
      Tribune de Genève
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.tdg.ch/" rel="noreferer nofollow noopener">https://www.tdg.ch/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/tdgch" rel="noreferer nofollow noopener">@tdgch</a>
        </span>
      </li>
    </ul>
    <h2 id="source_technikartmag">
      Technikart
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.technikart.com/" rel="noreferer nofollow noopener">https://www.technikart.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/technikartmag" rel="noreferer nofollow noopener">@technikartmag</a>
        </span>
      </li>
    </ul>
    <h2 id="source_telerama">
      Télérama
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.telerama.fr/abonnement/" rel="noreferer nofollow noopener">https://www.telerama.fr/abonnement/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/telerama" rel="noreferer nofollow noopener">@telerama</a>
        </span>
      </li>
    </ul>
    <h2 id="source_teleramasortir">
      Télérama Sortir
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://sortir.telerama.fr/" rel="noreferer nofollow noopener">https://sortir.telerama.fr/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/teleramasortir" rel="noreferer nofollow noopener">@teleramasortir</a>
        </span>
      </li>
    </ul>
    <h2 id="source_terrafemina">
      Terrafemina
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.terrafemina.com/" rel="noreferer nofollow noopener">https://www.terrafemina.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/terrafemina" rel="noreferer nofollow noopener">@terrafemina</a>
        </span>
      </li>
    </ul>
    <h2 id="source_toutelaculture">
      Toute La Culture
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.toutelaculture.com/" rel="noreferer nofollow noopener">https://www.toutelaculture.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/toutelaculture" rel="noreferer nofollow noopener">@toutelaculture</a>
        </span>
      </li>
    </ul>
    <h2 id="source_usbeketrica">
      Usbek & Rica
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://usbeketrica.com/" rel="noreferer nofollow noopener">https://usbeketrica.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/usbeketrica" rel="noreferer nofollow noopener">@usbeketrica</a>
        </span>
      </li>
    </ul>
    <h2 id="source_usinenouvelle">
      L'Usine Nouvelle
    </h2>
    <ul class="sources__media">
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://www.usinenouvelle.com/" rel="noreferer nofollow noopener">https://www.usinenouvelle.com/</a>
        </span>
      </li>
      <li>
        <span class="sources__external-link-container">
          <a class="sources__external-link" href="https://twitter.com/usinenouvelle" rel="noreferer nofollow noopener">@usinenouvelle</a>
        </span>
      </li>
    </ul>
    <p id="footnote" class="sources__footnote">
      <sup>*</sup> La popularité est dérivée du nombre de RTs des publications depuis Twitter
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
class SourcesPage extends Vue {
  $refs!: {
    list: HTMLElement,
    [key: string]: any
  }

  get isShowingSourcesPage () {
    return this.$route.name === 'sources'
  }

  scrollIntoView () {
    if (!this.isShowingSourcesPage) {
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
