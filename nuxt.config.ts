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
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-NLWHFPWW39', async: true },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NLWHFPWW39');
          `,
          type: 'text/javascript',
        }
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/nued.webp' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel:'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Manjari:wght@100;400;700&display=swap' }
      ]
    }
  },
  srcDir: 'playground/',
  runtimeConfig: {
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    REPO_NAME: process.env.GITHUB_REPO,
  }
})
