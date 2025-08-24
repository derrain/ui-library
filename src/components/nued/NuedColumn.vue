<script lang="ts" setup>
  import { computed } from 'vue';
  import type { ColumnProps } from '../../types/column';

  const props = defineProps<ColumnProps>();

  const sizeMap: Record<string, string> = {
    onefifth: '1/5',
    onefourth: '1/4',
    onethird: '1/3',
    half: '1/2',
    full: '1',
  };

  const computeSize = computed(() => {
    let sizeValue = sizeMap[props.colSize || ''] || props.colSize;

    if (!sizeValue?.includes('/'))
      return '100%';

    let [num, denom] = sizeValue.split('/').map(Number);

    return denom ? `${(num / denom) * 100}%` : '100%';
  });
</script>

<template>
  <div
    class="nued-column"
    :style="{ width: computeSize }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  .nued-column {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
  }
</style>