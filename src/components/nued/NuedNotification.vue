<script lang="ts" setup>
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch
  } from 'vue';

  import type { NotificationProps } from '../../types/notification';
  import NuedIcon from './NuedIcon.vue';

  const props = withDefaults(
    defineProps<NotificationProps>(),
    {
      title: '',
      message: '',
      showIcon: false,
      iconName: '',
      position: 'right',
      variant: 'info',
      dismissible: false,
      autoDismissInterval: 5000,
      gap: '1rem'
    }
  );

  interface NotificationInstance {
    id: number;
  }

  const notifications = ref<NotificationInstance[]>([]);

  const stackRef = ref<HTMLElement | null>(null);

  const hasOverflow = ref(false);
  const canScrollUp = ref(false);
  const canScrollDown = ref(false);

  const timers = new Map<
    number,
    ReturnType<typeof setTimeout>
  >();

  let notificationId = 0;
  let resizeObserver: ResizeObserver | null = null;

  const stackClasses = computed(() => [
    'nued-notification-stack',
    `nued-notification-stack--${props.position}`,
    {
      'is-scrollable': hasOverflow.value,
      'can-scroll-up': canScrollUp.value,
      'can-scroll-down': canScrollDown.value
    }
  ]);

  const getDismissInterval = () => {
    const interval = Number(
      props.autoDismissInterval
    );

    return Number.isNaN(interval) ||
      interval <= 0
      ? 5000
      : interval;
  };

  const clearNotificationTimer = (
    id: number
  ) => {
    const timer = timers.get(id);

    if (!timer) return;

    clearTimeout(timer);
    timers.delete(id);
  };

  const startNotificationTimer = (
    id: number
  ) => {
    clearNotificationTimer(id);

    const interval =
      getDismissInterval();

    timers.set(
      id,
      setTimeout(() => {
        dismiss(id);
      }, interval)
    );
  };

  const restartAllTimers = () => {
    notifications.value.forEach(
      notification => {
        startNotificationTimer(
          notification.id
        );
      }
    );
  };

  const updateScrollState = () => {
    const stack = stackRef.value;

    if (!stack) {
      hasOverflow.value = false;
      canScrollUp.value = false;
      canScrollDown.value = false;

      return;
    }

    const viewportHeight =
      window.visualViewport?.height ??
      window.innerHeight;

    /*
      The notification stack has:
      top: 1rem

      We also reserve another 1rem at
      the bottom of the viewport.
    */
    const availableHeight =
      viewportHeight - 32;

    const tolerance = 2;

    /*
      scrollHeight represents the full height
      of all notifications, including content
      that is currently clipped.
    */
    hasOverflow.value =
      stack.scrollHeight >
      availableHeight + tolerance;

    if (!hasOverflow.value) {
      canScrollUp.value = false;
      canScrollDown.value = false;

      stack.scrollTop = 0;

      return;
    }

    canScrollUp.value =
      stack.scrollTop > tolerance;

    canScrollDown.value =
      stack.scrollTop +
        stack.clientHeight <
      stack.scrollHeight - tolerance;
  };

  const updateAfterRender = async () => {
    await nextTick();

    updateScrollState();
  };

  const dismiss = async (
    id: number
  ) => {
    clearNotificationTimer(id);

    notifications.value =
      notifications.value.filter(
        notification =>
          notification.id !== id
      );

    await updateAfterRender();
  };

  const show = async () => {
    notificationId += 1;

    const notification = {
      id: notificationId
    };

    notifications.value.push(
      notification
    );

    startNotificationTimer(
      notification.id
    );

    await updateAfterRender();

    const element = stackRef.value;

    if (
      element &&
      hasOverflow.value
    ) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const clear = () => {
    timers.forEach(timer => {
      clearTimeout(timer);
    });

    timers.clear();

    notifications.value = [];

    updateAfterRender();
  };

  /*
    If the developer changes the dismiss
    interval, every currently visible
    notification receives the new timer.

    Future notifications automatically
    use the same current prop value.
  */
  watch(
    () => props.autoDismissInterval,
    () => {
      restartAllTimers();
    }
  );

  /*
    Changes such as position, title,
    message, icon, variant and
    dismissibility are already reactive
    because every notification renders
    directly from props.

    This watcher only recalculates layout
    in case any of those changes affects
    notification height.
  */
  watch(
    () => [
      props.title,
      props.message,
      props.showIcon,
      props.iconName,
      props.variant,
      props.dismissible,
      props.position,
      props.gap
    ],
    async () => {
      await updateAfterRender();
    }
  );

  defineExpose({
    show,
    dismiss,
    clear
  });

  onMounted(() => {
    if (
      typeof ResizeObserver !==
      'undefined'
    ) {
      resizeObserver =
        new ResizeObserver(() => {
          updateScrollState();
        });

      if (stackRef.value) {
        resizeObserver.observe(
          stackRef.value
        );
      }
    }

    window.addEventListener(
      'resize',
      updateScrollState
    );

    updateScrollState();
  });

  onBeforeUnmount(() => {
    timers.forEach(timer => {
      clearTimeout(timer);
    });

    window.removeEventListener(
      'resize',
      updateScrollState
    );

    timers.clear();

    resizeObserver?.disconnect();
  });
</script>

<template>
  <Teleport to="body">
    <div
      v-if="notifications.length"
      ref="stackRef"
      :class="stackClasses"
      :style="{
        '--nued-notification-gap': gap
      }"
      aria-live="polite"
      aria-relevant="additions removals"
      @scroll="updateScrollState"
    >
      <TransitionGroup
        name="nued-notification"
        tag="div"
        class="nued-notification-list"
      >
        <article
          v-for="notification in notifications"
          :key="notification.id"
          role="status"
          class="nued-notification"
          :class="[
            `nued-notification--${variant}`,
            {
              dismissible
            }
          ]"
        >
          <div
            class="nued-notification--content"
          >
            <NuedIcon
              v-if="
                showIcon &&
                iconName
              "
              :name="iconName"
              size="medium"
              class="nued-notification--icon"
            />

            <div
              class="nued-notification--body"
            >
              <h4
                v-if="title"
              >
                {{ title }}
              </h4>

              <p
                v-if="message"
              >
                {{ message }}
              </p>
            </div>
          </div>

          <button
            v-if="dismissible"
            type="button"
            class="dismissible-btn"
            aria-label="Dismiss notification"
            @click="
              dismiss(notification.id)
            "
          >
            &times;
          </button>
        </article>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
  @use "sass:list";
  @use '@nued/styles/nued-colors' as *;

  .nued-notification-stack {
    --nued-notification-width: 350px;
    --nued-notification-gap: 1rem;

    width:
      var(--nued-notification-width);

    max-height:
      calc(100dvh - 2rem);

    position: fixed;
    top: 1rem;

    z-index: 9999;

    padding-right: 12px;
    margin-right: -12px;

    overflow-x: hidden;
    overflow-y: hidden;

    box-sizing: content-box;

    overscroll-behavior: contain;

    scrollbar-width: thin;

    &--left {
      left: 1rem;
    }

    &--right {
      right: 1rem;
    }

    &.is-scrollable {
      overflow-y: auto;
    }
  }

  .nued-notification-list {
    display: flex;
    flex-direction: column;

    gap:
      var(--nued-notification-gap);

    width:
      var(--nued-notification-width);
  }

  .nued-notification {
    width:
      var(--nued-notification-width);

    flex-shrink: 0;

    font-weight: 300;

    position: relative;

    display: grid;

    padding: 1rem;

    border-radius: 8px;

    box-sizing: border-box;

    .nued-notification--content {
      display: inline-flex;

      .nued-notification--icon {
        padding-right: 1rem;
        flex-shrink: 0;
      }

      .nued-notification--body {
        min-width: 0;

        h4 {
          font-size: 1.15rem;
          font-weight: 400;
          margin: 0 0 .5rem;
          overflow-wrap: anywhere;
        }

        p {
          font-size: 1rem;
          margin: 0;
          overflow-wrap: anywhere;
        }
      }
    }

    @each $key, $values in $alert-variants {
      $bg-color:
        list.nth($values, 1);

      $text-color:
        list.nth($values, 2);

      &.nued-notification--#{$key} {
        background: $white;
        color: $text-color;

        border-bottom:
          5px solid $bg-color;

        h4 {
          color: $bg-color;
        }
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

      transition:
        opacity .4s ease;

      &:hover {
        opacity: .65;
      }

      &:focus-visible {
        outline:
          2px solid currentColor;

        outline-offset: -4px;
      }
    }
  }

  .nued-notification-enter-active {
    transition:
      opacity .25s ease,
      transform .25s ease;
  }

  .nued-notification-enter-from {
    opacity: 0;
    transform: translateY(-12px);
  }

  .nued-notification-leave-active {
    position: absolute;

    transition:
      opacity .25s ease,
      transform .25s ease;
  }

  .nued-notification-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }

  .nued-notification-move {
    transition:
      transform .25s ease;
  }

  @media (
    max-width: 420px
  ) {
    .nued-notification-stack {
      --nued-notification-width:
        calc(100vw - 2rem);

      &--left,
      &--right {
        left: 1rem;
        right: auto;
      }
    }
  }

  @media (
    prefers-reduced-motion: reduce
  ) {
    .nued-notification-enter-active,
    .nued-notification-leave-active,
    .nued-notification-move {
      transition: none;
    }
  }
</style>