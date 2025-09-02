<template>
  <a
    :href="nav"
    class="back-nav"
    @click="focusNav"
    @keydown.enter.prevent="focusNav"
    @keydown.space.prevent="focusNav">
    Back to navigation
  </a>
</template>

<script lang="ts" setup>
  import { focusLastNav } from '~~/src/composables/useNavFocus';

  const props = defineProps<{ nav: string }>();

  const focusNav = () => {
    requestAnimationFrame(() => {
      const ok = focusLastNav();

      if (!ok)
        document.querySelector<HTMLElement>('#side-nav')?.focus();
    });
  }
</script>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  .back-nav {
    background: $lightgrey;
    color: $black;
    position: absolute;
    inset-inline-start: 1rem;
    inset-block-start: -999px;
    padding: .75rem 1rem .25rem;
    border: 2px solid currentColor;
    text-decoration: none;

    &:focus-visible {
      inset-block-start: 1rem;
    }
  }

  .sr {
    width: 1px;
    height: 1px;
    position: absolute !important;
    margin: -1px;
    padding: -1px;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    overflow: hidden;
  }
</style>