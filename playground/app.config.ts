import { defineAppConfig } from 'nuxt/app';

export default defineAppConfig({
  head: {
    script: [
      {
        innerHTML: `
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-NLWHFPWW39"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NLWHFPWW39');
          </script>
        `,
        type: 'text/javascript',
      },
    ],
  },
});