<script lang="ts" setup>
  import { computed } from 'vue';
  import type { RowProps } from '../../types/row';

  const props = withDefaults(defineProps<RowProps>(), {
    hAlign: 'center',
    vAlign: 'center',
    rowSize: 'large'
  });

  const rowStyles = computed(() => ({
    justifyContent:
      props.hAlign === 'left' ? 'flex-start' :
      props.hAlign === 'right' ? 'flex-end' :
      'center',
    alignItems:
      props.vAlign === 'top' ? 'flex-start' :
      props.vAlign === 'bottom' ? 'flex-end' :
      'center',
    maxWidth:
      props.rowSize === 'small' ? '600px' :
      props.rowSize === 'medium' ? '800px' :
      '1200px'
  }));
</script>

<template>
  <div
    class="nued-row"
    :style="rowStyles">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  @use '@nued/styles/nued-colors' as *;

  .nued-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    padding: 1rem;
    box-sizing: border-box;
  }
</style>