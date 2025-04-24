<script lang="ts" setup>
  import { onMounted, useSlots } from 'vue';
  import type { VNode } from 'vue';
  import type { ListProps } from '../../types/list';

  const props = withDefaults(defineProps<ListProps>(), {
    viewHeight: 'small',
    viewWidth: 'small'
  });
</script>

<template>
  <div
    role="list"
    :class="[
      'nued-list-wrapper',
      `nued-list-wrapper--height_${viewHeight}`,
      `nued-list-wrapper--width_${viewWidth}`
    ]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  @use '../../../playground/assets/colors' as *;

  .nued-list-wrapper {
    background: transparent;
    width: 100%;
    position: relative;
    padding: .25rem;
    overflow-y: auto;

    &.nued-list-wrapper--height {
      &_small {
        max-height: 350px;
      }

      &_medium {
        max-height: 500px;
      }

      &_large {
        max-height: 750px;
      }
    }

    &.nued-list-wrapper--width {
      &_small {
        max-width: 500px;
      }

      &_medium {
        max-width: 750px;
      }

      &_large {
        max-width: 100%;
      }
    }
  }
</style>