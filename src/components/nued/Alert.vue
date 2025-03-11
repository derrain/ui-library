<script lang="ts" setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  import type { AlertProps } from '~~/src/types/alert';

  const props = withDefaults(defineProps<AlertProps>(), {
    variant: 'info',
    dismissible: false,
    autoDismiss: false,
    autoDismissInterval: 5000
  });

  const isAlertVisible = ref(true);
  let dismissTimer: NodeJS.Timeout | null = null;

  const dismissAlert = () => {
    isAlertVisible.value = false

    if (dismissTimer) {
      clearTimeout(dismissTimer);
    }
  };

  const setupAutoDismiss = () => {
    if (props.autoDismiss) {
      dismissTimer = setTimeout(() => {
        dismissAlert();
      }, props.autoDismissInterval);
    }
  };

  watch(() => props.autoDismiss, () => {
    if (props.autoDismiss) {
      setupAutoDismiss();
    }
  });

  onMounted(() => {
    setupAutoDismiss();
  });

  onUnmounted(() => {
    if (dismissTimer) {
      clearTimeout(dismissTimer);
    }
  });
</script>

<template>
  <div
    v-if="isAlertVisible"
    role="alert"
    :class="[
      'nued-alert',
      `nued-alert--${variant}`,
      `${dismissible ? 'dismissible' : ''}`
    ]">
    <slot />
    <button
      v-if="dismissible"
      class="dismissible-btn"
      aria-label="dismiss alert"
      @click="dismissAlert">
      &times;
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @use "sass:color";
  @use "sass:list";
  @use '~/assets/colors' as *;

  .nued-alert {
    font-weight: 400;
    display: grid;
    position: relative;
    padding: 1rem;
    border-radius: 8px;

    @each $key, $values in $alert-variants {
      $bg-color: list.nth($values, 1);
      $text-color: list.nth($values, 2);

      &.nued-alert--#{$key} {
        background: color.adjust($bg-color, $lightness: 15%);
        color: $text-color;
        border: 2px solid $bg-color;
      }
    }

    &.dismissible {
      padding-right: 80px;
    }

    .dismissible-btn {
      background: transparent;
      font-size: 1.2rem;
      width: 60px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      border: 0;
      cursor: pointer;
      opacity: .5;
      transition: .4s ease all;

      &:hover {
        opacity: .65;
      }
    }
  }
</style>