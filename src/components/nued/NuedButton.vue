<script lang="ts" setup>
  import { computed } from 'vue';
  import type { ButtonProps } from '../../types/button';
  import { generateMarginStyles } from '../../utils/units';

  const props = withDefaults(defineProps<ButtonProps>(), {
    size: 'medium',
    variant: 'secondary',
    disabled: false,
    margin: '',
  });

  const spacingStyles = computed(() => {
    return generateMarginStyles({
      margin: props.margin,
    });
  });
</script>

<template>
  <button
    :class="[
      'nued-button',
      `nued-button--${size}`,
      `nued-button--${variant}`,
      { 'nued-button--disabled': disabled }
    ]"
    :style="spacingStyles"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  @use "sass:color";
  @use "sass:list";
  @use '../../../playground/assets/colors' as *;

  .nued-button {
    font-size: 16px;
    font-weight: 400;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    transition: background 0.2s ease-in-out;
    cursor: pointer;

    &.nued-button--small {
      font-size: 14px;
      padding: 6px 12px;
    }

    &.nued-button--medium {
      font-size: 16px;
      padding: 10px 20px;
    }

    &.nued-button--large {
      font-size: 18px;
      padding: 12px 24px;
    }

    @each $key, $values in $button-variants {
      $bg-color: list.nth($values, 1);
      $text-color: list.nth($values, 2);

      &.nued-button--#{$key} {
        background: $bg-color;
        color: $text-color;

        &:hover {
          background: color.adjust($bg-color, $lightness: -10%);
        }
      }
    }

    &.nued-button--disabled {
      background: $darkgrey-2;
      opacity: .6;
      cursor: not-allowed;
    }
  }
</style>