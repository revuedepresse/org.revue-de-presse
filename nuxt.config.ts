import { NuxtConfig } from '@nuxt/types'
import TerserPlugin from 'terser-webpack-plugin'
import { now, setTimezone } from './mixins/date'
import Site from './modules/site'

const description =
  'Chaque jour, une revue de presse des 10 publications des médias les plus marquantes'
const title = 'Revue de presse'
const banner = `${Site.baseURL}/revue-de-presse-banner.jpg`
const icon = '/logo-revue-de-presse.png'

const days = () => {
  const days = [setTimezone(new Date(Date.parse('01 Jan 2018 00:00:00 GMT')))]
  let next = days[days.length - 1]

  const yesterday = now()
  yesterday.setTime(now().getTime() - (27 * 60 * 60 * 1000))

  do {
    const nextDate = new Date()
    nextDate.setMonth(next.getMonth())
    nextDate.setFullYear(next.getFullYear())

    days.push(setTimezone(new Date(nextDate.setDate(next.getDate() + 1))))
    next = days[days.length - 1]
  } while (next <= yesterday)

  return days.map((d) => {
    let month = `${d.getMonth() + 1}`
    if (d.getMonth() + 1 < 10) {
      month = `0${month}`
    }

    let date = `${d.getDate()}`
    if (d.getDate() < 10) {
      date = `0${date}`
    }

    return `/${d.getFullYear()}-${month}-${date}`
  })
}

type Route = {
  name: string,
  path: string,
  component: string,
}

const config: NuxtConfig = {
  pattern: '**/*.{vue,js}',

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
        content: Site.baseURL
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
      },
      {
        hid: 'date',
        name: 'date',
        content: '{{ date }}'
      }
    ],
    noscript: [
      {
        innerHTML:
          'Revue de presse nécessite JavaScript pour son bon fonctionnement.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: icon },
      { rel: 'preload', href: '/fonts/signika-regular.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
      { rel: 'preload', href: '/fonts/roboto-regular.woff2', as: 'font', type: 'font/woff2', crossorigin: true }
    ]
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
    '@nuxtjs/pwa',
    '@nuxtjs/router',
    '@nuxtjs/svg',
    'cookie-universal-nuxt',
    'nuxt-lazysizes',
    'nuxt-purgecss',
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
      theme_color: '#006663'
    }
  },

  lazySizes: {
    extendAssetUrls: {
      img: 'data-src'
    }
  },

  modules: [
    'nuxt-trailingslash-module',
    '@nuxtjs/device',
    '@nuxtjs/style-resources',
    [
      'nuxt-compress',
      {
        brotli: {
          threshold: 8192
        }
      }
    ],
    '@nuxtjs/sitemap'
  ],

  dateFns: {
    defaultLocale: 'fr'
  },

  env: {
    API_HOST: process.env.API_HOST || '',
    API_AUTH_TOKEN: process.env.API_AUTH_TOKEN || '',
    NODE_ENV: process.env.NODE_ENV || ''
  },

  router: {
    trailingSlash: false,
    extendRoutes (routes: Route[], resolve: (dir: string, path: string) => string): void {
      routes.push({
        name: 'homepage',
        path: '/',
        component: resolve(__dirname, 'pages/highlight/_day.vue')
      })
      routes.push({
        name: 'contact',
        path: '/nous-contacter',
        component: resolve(__dirname, 'pages/highlight/_day.vue')
      })
      routes.push({
        name: 'not-found',
        path: '/contenu-introuvable',
        component: resolve(__dirname, 'pages/highlight/_day.vue')
      })
      routes.push({
        name: 'source',
        path: '/source/:twitterId/:username',
        component: resolve(__dirname, 'pages/highlight/_day.vue')
      })
      routes.push({
        name: 'sources',
        path: '/sources',
        component: resolve(__dirname, 'pages/highlight/_day.vue')
      })
      routes.push({
        name: 'legal-notice',
        path: '/mentions-legales',
        component: resolve(__dirname, 'pages/highlight/_day.vue')
      })
      routes.push({
        name: 'support',
        path: '/nous-soutenir',
        component: resolve(__dirname, 'pages/highlight/_day.vue')
      })
      routes.push({
        name: 'curated-highlights',
        path: '/:day',
        component: resolve(__dirname, 'pages/highlight/_day.vue')
      })
    }
  },

  sitemap: {
    hostname: 'https://revue-de-presse.org',
    gzip: true,
    trailingSlash: false,
    exclude: [],
    routes: [
      {
        url: '/',
        changefreq: 'daily',
        lastmod: (now().toISOString())
      },
      {
        url: '/contact',
        lastmod: (new Date('2023-03-02').toISOString())
      },
      {
        url: '/mentions-legales',
        lastmod: (new Date('2023-01-23').toISOString())
      },
      {
        url: '/sources',
        lastmod: (new Date('2023-03-02').toISOString())
      },
      {
        url: '/nous-soutenir',
        lastmod: (new Date('2023-03-06').toISOString())
      },
      ...days()
        .map((d: string) => {
          const day = new Date(d.replace('/', ''))
          day.setTime(day.getTime() + (23 * 60 * 60 * 1000))

          return {
            url: d,
            lastmod: (day.toISOString())
          }
        })
        .reverse()
    ]
  },

  styleResources: {
    scss: ['./styles/variables.scss', './styles/global.scss']
  },

  generate: {
    fallback: true,
    subFolders: false,
    routes: ['/', ...days()]
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*'
      }
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: false
        })
      ]
    },
    transpile: ['sparklines']
  },

  plugins: ['~/plugins/sparklines.js'],

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
}

export default config
