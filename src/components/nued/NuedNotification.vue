<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, toRefs } from 'vue';
  import type { NotificationProps } from '../../types/notification';
  import NuedIcon from './NuedIcon.vue';

  const props = withDefaults(defineProps<NotificationProps>(), {
    title: '',
    message: '',
    showIcon: false,
    iconName: '',
    position: 'right',
    variant: 'info',
    dismissible: false,
    autoDismissInterval: 5000,
  });

  const { position, variant, dismissible, autoDismissInterval } = toRefs(props);

  const isNotificationVisible = ref(true);
  let dismissTimer: NodeJS.Timeout | null = null;
  const emit = defineEmits(['dismiss']);

  const dismissNotification = () => {
    isNotificationVisible.value = false;
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

    const interval = Number(autoDismissInterval.value);
    const fallbackInterval = isNaN(interval) || interval <= 0 ? 5000 : interval;

    if (isNotificationVisible.value) {
      dismissTimer = setTimeout(dismissNotification, fallbackInterval);
    }
  };

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
    v-if="isNotificationVisible"
    role="alert"
    :class="[
      'nued-notification',
      `nued-notification--${variant}`,
      `nued-notification--${position}`,
      `${dismissible ? 'dismissible' : ''}`
    ]"
    >
    <div class="nued-notification--content">
      <NuedIcon
        v-if="showIcon && iconName"
        :name="iconName"
        size="medium"
        class="nued-notification--icon" />

      <div class="nued-notification--body">
        <h4>{{ title }}</h4>
        <p>{{ message }}</p>
      </div>
    </div>
    <button
      v-if="dismissible"
      class="dismissible-btn"
      aria-label="dismiss notification"
      @click="dismissNotification">
      &times;
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @use "sass:color";
  @use "sass:list";
  @use '../../../playground/assets/colors' as *;

  .nued-notification {
    font-weight: 300;
    max-width: 350px;
    display: grid;
    position: fixed;
    top: 1rem;
    padding: 1rem;
    border-radius: 8px;
    box-sizing: border-box;
    z-index: 9999;

    .nued-notification--content {
      display: inline-flex;

      .nued-notification--icon {
        padding-right: 1rem;
        flex-shrink: 0;
      }

      .nued-notification--body {
        h4 {
          font-size: 1.15rem;
          font-weight: 400;
          margin: 0 0 .5rem;
        }

        p {
          font-size: 1rem;
          margin: 0;
        }
      }
    }

    @each $key, $values in $alert-variants {
      $bg-color: list.nth($values, 1);
      $text-color: list.nth($values, 2);

      &.nued-notification--#{$key} {
        background: $white;
        color: $text-color;
        border-bottom: 5px solid $bg-color;

        h4 {
          color: $bg-color;
        }
      }
    }

    &.nued-notification--left {
      left: 1rem;
    }

    &.nued-notification--center {
      left: 50%;
      transform: translateX(-50%);
    }

    &.nued-notification--right {
      right: 1rem;
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