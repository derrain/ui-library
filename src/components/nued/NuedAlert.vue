<script lang="ts" setup>
  import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
  import type { AlertProps } from '../../types/alert';
  import { generateMarginStyles } from '../../utils/units';

  const props = withDefaults(defineProps<AlertProps>(), {
    variant: 'info',
    dismissible: false,
    autoDismiss: false,
    autoDismissInterval: 5000,
    margin: '',
  });

  const spacingStyles = computed(() => {
    return generateMarginStyles({
      margin: props.margin,
    });
  });

  const isAlertVisible = ref(true);
  let dismissTimer: NodeJS.Timeout | null = null;
  const emit = defineEmits(['dismiss']);

  const dismissAlert = () => {
    isAlertVisible.value = false;
    emit('dismiss');

    if (dismissTimer) {
      clearTimeout(dismissTimer);
    }
  };

  const setupAutoDismiss = () => {
    if (dismissTimer) {
      clearTimeout(dismissTimer);
      dismissTimer = null;
    }

    if (props.autoDismiss && isAlertVisible.value) {
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
    ]"
    :style="spacingStyles"
    >
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
    width: 100%;
    display: grid;
    position: relative;
    padding: 1rem;
    border-radius: 8px;
    box-sizing: border-box;

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
      padding-right: 60px;
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