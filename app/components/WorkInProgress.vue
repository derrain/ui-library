<script setup>
  import { useRoute } from 'vue-router';
  import NuedIcon from '~~/src/components/nued/NuedIcon.vue';

  const route = useRoute();
  const path = route.path.replace('/', ' ').replace(/\b\w/g, c => c.toUpperCase());
</script>

<template>
  <div class="wipWrapper">
    <NuedIcon name="toolkit" size="large" />
    <h2>Work In Progress</h2>
    <p>Oops! The <span class="component-name">{{ path }}</span> component is still under development</p>
  </div>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  .wipWrapper {
    text-align: center;

    svg {
      font-size: 5rem !important;
    }

    h2 {
      font-size: 2.15rem;
      font-weight: 100;
      margin-top: 1.5rem;
      margin-bottom: .5rem;

      @media screen and (min-width: 991px) {
        font-size: 4rem;
      }
    }

    p {
      font-size: 1.35rem;
      color: $lightgrey;

      .component-name {
        color: $primary;
      }

      @media screen and (min-width: 991px) {
        font-size: 1.75rem;
      }
    }
  }
</style>