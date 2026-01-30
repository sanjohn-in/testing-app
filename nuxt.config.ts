// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    head: {
      titleTemplate: '%s - App testing!',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Testing app for work' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap'
        }
      ]
    }
  },
  routeRules: {
    "/header": {
      isr: 300
    },
  },
  devtools: { enabled: true },
  plugins: [
  ],
  nitro: {
    devProxy: {},
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
  css: ["~/assets/css/main.css"],

})