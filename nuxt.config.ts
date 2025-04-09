// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: [
    {
      path: '~/components',
      global: true
    },
    {
      path: '~/components/nued',
      prefix: 'Nued',
    }
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon'
    }
  },
  app: {
    rootAttrs: {
      id: 'nued-root'
    },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel:'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manjari:wght@100;400;700&display=swap' }
      ]
    }
  },
  srcDir: 'playground/',
  runtimeConfig: {
    public: {
      gaId: process.env.NUXT_PUBLIC_GA_ID
    }
  },
})
