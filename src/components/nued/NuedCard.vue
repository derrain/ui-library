<script lang="ts" setup>
  import { computed, toRefs, onMounted } from 'vue';
  import type { CardProps } from '../../types/card';

  const props = withDefaults(defineProps<CardProps>(), {
    title: '',
    body: '',
    imageSrc: '',
    imageAlt: '',
    imageCrop: 'landscape',
    imageWrapperPadding: '',
    clampLines: 0,
    isClickable: false,
    clickEvent: undefined,
    isLink: false,
    href: '',
    target: '_self',
    rel: 'noopener noreferrer',
    contentPadding: '',
  });

  const effectiveIsClickable = computed(() => !!props.isClickable);
  const effectiveIsLink = computed(() => !effectiveIsClickable.value && !!props.isLink);
  
  const wrapperTag = computed(() => (effectiveIsLink.value ? 'a' : 'div'));

  const cardAttrs = computed(() => {
    if (effectiveIsLink.value) {
      return {
        href: props.href || '#',
        target: props.target,
        rel: props.target === '_blank' ? (props.rel || 'noopener noreferrer') : props.rel
      };
    }

    if (effectiveIsClickable.value) {
      return {
        role: 'button',
        tabindex: 0,
        'aria-label': props.title || 'Card'
      };
    }

    return {};
  });

  const onRootClick = (e: MouseEvent) => {
    if (effectiveIsClickable.value && typeof props.clickEvent === 'function') {
      props.clickEvent(e);
    }
  }

  const onRootKeydown = (e: KeyboardEvent) => {
    if (!effectiveIsClickable.value)
      return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      if (typeof props.clickEvent === 'function')
        props.clickEvent(e);
    }
  }

  const hasImage = computed(() => !!props.imageSrc);

  const imageWrapStyle = computed(() => {
    const ratio = props.imageCrop === 'square' ? '1 / 1' : '16 / 9';

    return {
      aspectRatio: ratio,
      padding: props.imageWrapperPadding || undefined,
      boxSizing: 'border-box' as const
    };
  });

  const contentStyle = computed(() => ({
    padding: props.contentPadding || undefined
  }));

  const bodyClampVars = computed(() => ({
    '--nued-card-clamp': String(props.clampLines ?? 0)
  }));
</script>

<template>
  <component
    :is="wrapperTag"
    v-bind="cardAttrs"
    :class="[
      'nued-card',
      { 'is-clickable': effectiveIsClickable }
    ]"
    @click="onRootClick"
    @keydown="onRootKeydown">
    <div
      v-if="hasImage"
      class="nued-card_image-wrap"
      :style="imageWrapStyle">
      <img
        class="nued-card--image"
        :src="imageSrc"
        :alt="imageAlt || ''"
        loading="lazy"
        decoding="async" />
    </div>

    <div
      class="nued-card--content"
      :style="contentStyle">
      <h3
        v-if="title"
        class="nued-card--title">
        <slot name="title">
          {{ title }}
        </slot>
      </h3>

      <div
        v-if="body"
        class="nued-card--body"
        :class="{ 'is-clamped': (clampLines ?? 0) > 0 }"
        :style="bodyClampVars">
        <slot>
          {{ body }}
        </slot>
      </div>

      <div class="nued-card--actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </component>
</template>

<style lang="scss" scoped>
  @use '@nued/styles/nued-colors' as *;

  .nued-card {
    background: $white;
    color: $black;
    width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid $darkgrey-1;
    border-radius: 10px;
    text-decoration: none;
    overflow: hidden;
    box-sizing: border-box;

    &.is-clickable {
      cursor: pointer;
      transition: box-shadow .25s ease, transform .2s ease;

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 6px 18px rgb(0 0 0 / .25);
      }

      &:active {
        transform: translateY(0);
      }
    }

    .nued-card--image-wrap {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      box-sizing: border-box;

      .nued-card--image {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
    }

    .nued-card--content {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      gap: .5rem;
      box-sizing: border-box;

      .nued-card--title {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
        line-height: 1.3;
      }

      .nued-card--body {
        color: $text-dark;
        font-size: .95rem;
        line-height: 1.5;

        &.is-clamped {
          display: -webkit-box;
          -webkit-line-clamp: var(--nued-card-clamp, 2);
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        a {
          color: $primary;

          &:hover {
            opacity: .85;
          }
        }
      }

      .nued-card--actions {
        display: flex;
        margin-top: auto;
        gap: .5rem;
        flex-wrap: wrap;
      }
    }
  }
</style>