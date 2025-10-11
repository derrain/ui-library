<script lang="ts" setup>
  import { computed, provide } from 'vue';
  import type { CardGroupProps, CardClickMode } from '../../types/card-group';
  import type { ButtonProps } from '~~/src/types/button';
  import { CARD_GROUP_KEY } from './card.provide';

  const props = withDefaults(defineProps<CardGroupProps>(), {
    columns: 3,
    clampLines: 3,
    clickMode: 'none' as CardClickMode,
    buttonLabel: 'View',
    gap: '1rem',
    buttonText: 'View',
    buttonprops: undefined as unknown as Partial<ButtonProps> | undefined
  });

  const ctx = {
    clampLines: computed(() => props.clampLines),
    clickMode: computed(() => props.clickMode),
    buttonText: computed(() => props.buttonText),
    buttonProps: computed(() => props.buttonProps)
  };

  provide(CARD_GROUP_KEY, ctx);

  const gridStyle = computed(() => ({
    '--nued-card-clamp': String(props.clampLines ?? 0),
    '--nued-card-gap': props.gap,
    gridTemplateColumns: `repeat(${Math.max(1, Math.min(6, props.columns))}, minmax(0, 1fr))`
  }));
</script>

<template>
  <div
    class="nued-card-group"
    :style="gridStyle"
    role="list">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .nued-card-group {
    display: grid;
    gap: var(--nued-card-gap, 1rem);
    align-items: stretch;
  }
</style>