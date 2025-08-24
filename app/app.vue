<script setup>
  import { useRoute } from 'vue-router';
  import { watchEffect } from 'vue';

  const route = useRoute();
  
  watchEffect(() => {
    const pathSegments = route.path.split('/').filter(Boolean);
    const componentName = pathSegments.length > 0 ?
      pathSegments[pathSegments.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) :
      'Home';

      useSeoMeta({
        title: `NUED | ${componentName}`,
        ogTitle: `NUED | ${componentName}`,
        description: componentName === 'Home' ?
          'NUED is a lightweight and customizable UI component library for Nuxt.js 3. Discover beautifully designed, reusable components built for seamless integration. Explore live demos, customize properties in real-time, and enhance your Nuxt projects with modern, accessible UI elements.' :
          `Explore the ${componentName} component in NUED, a modular UI component library for Nuxt.js. View its live demo, customize properties, and access detailed implementation guides.`,
        ogDescription: componentName === 'Home' ?
          'NUED is a lightweight and customizable UI component library for Nuxt.js 3. Discover beautifully designed, reusable components built for seamless integration. Explore live demos, customize properties in real-time, and enhance your Nuxt projects with modern, accessible UI elements.' :
          `Explore the ${componentName} component in NUED, a modular UI component library for Nuxt.js. View its live demo, customize properties, and access detailed implementation guides.`,
      });
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
  @use '~/assets/colors' as *;

  html,
  body {
    font-family: 'Manjari', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 100;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: $black;

    section {
      padding-bottom: 1rem;
    }

    .page-header {
      display: inline-block;
      position: relative;
      padding-bottom: 5px;

      &::before {
        content: "";
        position: absolute;
        width: 50%;
        bottom: 0;
        border-bottom: 2px solid $primary;
      }
    }

    p {
      font-size: 1.2rem;
      font-weight: 400;
      margin-top: 0;
      line-height: 1.5;
    }
  }
</style>