import { NuxtConfig } from '@nuxt/types'

const description =
    'Chaque jour, une revue de presse des 10 publications des médias les plus marquantes'
const title = 'Revue de presse'
const banner = 'https://revue-de-presse.org/revue-de-presse-banner.jpg'
const icon = '/daily-press-review.png'

type Route = {
  name: string,
  path: string,
  component: string,
}

const config: NuxtConfig = {
  pattern: '**/*.{vue,js,ts}',

  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'fr'
    },
    title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'author', name: 'author', content: '@revue_2_presse' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://revue-de-presse.org'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: title
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: banner
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: title
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@revue_2_presse' },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@revue_2_presse'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: banner
      }
    ],
    noscript: [
      {
        innerHTML:
            'Revue de presse nécessite JavaScript pour son bon fonctionnement.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/png', href: icon }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['./styles/variables.scss'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/date-fns',
    '@nuxtjs/emotion',
    '@nuxtjs/pwa',
    '@nuxtjs/router',
    '@nuxtjs/sentry',
    '@nuxtjs/svg',
    'nuxt-lazysizes',
    'nuxt-vuex-router-sync'
  ],

  pwa: {
    icon: {
      source: '~assets/revue-de-presse_400x400.jpg'
    },
    manifest: {
      name: title,
      lang: 'fr',
      short_name: title,
      useWebmanifestExtension: false
    },
    meta: {
      theme_color: '#42CFC9'
    }
  },

  lazySizes: {
    extendAssetUrls: {
      img: 'data-src'
    }
  },

  sentry: {
    dsn: process.env.RAVEN_DSN
  },

  modules: [
    '@nuxtjs/device',
    '@nuxtjs/style-resources',
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['faTwitter']
          }
        ]
      }
    ]
  ],

  dateFns: {
    defaultLocale: 'fr'
  },

  env: {
    API_HOST: process.env.API_HOST || '',
    API_AUTH_TOKEN: process.env.API_AUTH_TOKEN || '',
    NODE_ENV: process.env.NODE_ENV || '',
    RAVEN_DSN: process.env.RAVEN_DSN || ''
  },

  router: {
    middleware: 'redirect',
    extendRoutes (routes: Route[], resolve: (dir: string, path: string) => string): void {
      routes.push({
        name: 'homepage',
        path: '/',
        component: resolve(__dirname, 'pages/index.vue')
      })
      routes.push({
        name: 'daily-review',
        path: '/:startDate',
        component: resolve(__dirname, 'pages/-highlights.vue')
      })
    }
  },

  styleResources: {
    scss: ['./styles/variables.scss', './styles/global.scss']
  },

  generate: {
    routes: ['/']
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
}

export default config
