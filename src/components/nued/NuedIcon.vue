<script lang="ts" setup>
  import { computed } from 'vue';
  import { Icon } from '@iconify/vue';
  import { useIconConfig } from '../../composables/useIconConfig';
  import type { IconProps } from '../../types/icon';

  const props = withDefaults(defineProps<IconProps>(), {
    color: 'inherit',
    size: 'medium',
    display: 'block',
  });

  const { customIcons } = useIconConfig();

  const iconName = computed(() => (customIcons.value as Record<string, string>)[props.name] || props.name);
</script>

<template>
  <Icon
    :class="[
      'nued-icon',
      `nued-icon--${size}`
    ]"
    :style="{ color: props.color }"
    :icon="iconName"
    :color="color"
    :size="size"
    v-if="iconName"
  />
</template>

<style lang="scss" scoped>
  .nued-icon {
    line-height: 0;

    &.nued-icon--small {
      font-size: 1rem;
    }

    &.nued-icon--medium {
      font-size: 1.5rem;
    }

    &.nued-icon--large {
      font-size: 2rem;
    }
  }
</style>