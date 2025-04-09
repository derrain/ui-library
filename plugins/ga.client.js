import { defineNuxtPlugin } from "#app";
import VueGtag from "vue-gtag-next";

export default defineNuxtPlugin((nuxtApp) => {
  const gaMeasurementId = process.env.NUXT_PUBLIC_GA_ID;

  if (gaMeasurementId) {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: gaMeasurementId
      }
    });

    console.log('Google Analytics 4 tracking initialised.');
  } else {
    console.warn('Google Analytics 4 Measurement ID not set. Tracking will not be enabled.');
  }
});