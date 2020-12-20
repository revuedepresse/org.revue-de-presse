const description =
  "Chaque jour, une revue de presse des 10 publications des médias les plus marquantes";

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Daily Press Review",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: description },
      { hid: "og:description", name: "og:description", content: description },
      { hid: "og:type", name: "og:type", content: "website" },
      {
        hid: "og:image",
        name: "og:image",
        content: "/revue-de-presse-banner.png"
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "www.revue-de-presse.org"
      },
      { name: "twitter:card", content: "summary_large_image" },
      { hid: "twitter:site", name: "twitter:site", content: "@revue_2_presse" },
      {
        hid: "twitter:creator",
        name: "twitter:creator",
        content: "@revue_2_presse"
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Revue de presse"
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: description
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "/revue-de-presse-banner.png"
      }
    ],
    link: [{ rel: "icon", type: "image/png", href: "/daily-press-review.png" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["./styles/variables.scss"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/dotenv",
    "@nuxtjs/router",
    "@nuxtjs/axios",
    "@neneos/nuxt-animate.css",
    "@nuxtjs/date-fns",
    "@nuxtjs/sentry"
  ],

  sentry: {
    dsn: process.env.RAVEN_DSN
  },

  modules: [
    "@nuxtjs/style-resources",
    [
      "nuxt-fontawesome",
      {
        imports: [
          //import whole set
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: ["faTwitter"]
          },
          //import 2 icons from set
          // please note this is PRO set in this example,
          // you must have it in your node_modules to actually import
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: [
              "faArrowAltCircleUp",
              "faArrowAltCircleDown",
              "faCheck",
              "faComments",
              "faDoorOpen",
              "faExclamationTriangle",
              "faFileDownload",
              "faFire",
              "faHeart",
              "faImages",
              "faLink",
              "faLock",
              "faMinus",
              "faPen",
              "faPlus",
              "faRedoAlt",
              "faReply",
              "faRetweet",
              "faSync",
              "faTrash",
              "faTrashAlt",
              "faTh",
              "faUndo",
              "faUsers"
            ]
          }
        ]
      }
    ]
  ],

  dateFns: {
    defaultLocale: "fr"
  },

  env: {
    API_HOST: process.env.API_HOST,
    RAVEN_DSN: process.env.RAVEN_DSN,
    NODE_ENV: process.env.NODE_ENV,
    API_AUTH_TOKEN: process.env.API_AUTH_TOKEN
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "homepage",
        path: "/",
        component: resolve(__dirname, "pages/index.vue")
      });
      routes.push({
        name: "highlights",
        path: "/highlights/:startDate/:endDate",
        component: resolve(__dirname, "pages/-highlights.vue")
      });
    }
  },

  styleResources: {
    scss: ["./styles/variables.scss", "./styles/global.scss"]
  },

  generate: {
    routes: ["/"]
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
