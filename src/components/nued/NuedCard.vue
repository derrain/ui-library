<script lang="ts" setup>
  import { computed, inject } from 'vue';
  import type { CardProps } from '../../types/card';
  import { ButtonProps } from '~~/src/types/button';
  import NuedButton from './NuedButton.vue';
  import { CARD_GROUP_KEY } from './card.provide';

  const props = withDefaults(defineProps<CardProps>(), {
    imageSrc: '',
    imageAlt: '',
    title: '',
    description: '',
    onClick: undefined,
    onButtonClick: undefined,
    disabled: false,
  });

  const group = inject<any>(CARD_GROUP_KEY, {
    clampLines: computed(() => 2),
    clickMode: computed(() => 'none'),
    buttonText: computed(() => 'View'),
    buttonProps: computed<Partial<ButtonProps> | undefined>(() => undefined)
  });

  const clampLines = computed(() => Number(group.clampLines?.value ?? 3));
  const clickMode  = computed(() => group.clickMode?.value ?? 'none');

  const hasImage = computed(() => !!props.imageSrc);
  const hasTitle = computed(() => !!props.title);
  const hasDescription = computed(() => !!props.description);

  const mergedButtonProps = computed<Partial<ButtonProps>>(() => ({
    ...(group.buttonProps.value || {}),
    ...(props.buttonProps || {})
  }));

  const effectiveButtonText = computed(() =>
    props.buttonText ?? group.buttonText.value
  );

  const rootIsButtonCard = computed(() => group.clickMode.value === 'card');

  const handleRootClick = () => {
    if (group.clickMode.value === 'card' && props.onClick) {
      props.onClick();
    }
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (group.clickMode.value !== 'card')
      return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      props.onClick?.();
    }
  }

  const handleButtonClick = () => {
    if (props.onButtonClick)
      return props.onButtonClick();

    props.onClick?.();
  }
</script>

<template>
  <component
    class="nued-card"
    :class="{
      'is-card-action': rootIsButtonCard,
      'is-disabled': disabled
    }"
    :role="rootIsButtonCard ? 'button' : undefined"
    tabindex="0"
    @click="handleRootClick"
    @keydown="handleKeydown">
    <div
      class="nued-card--media"
      v-if="hasImage">
      <img
        :src="imageSrc"
        :alt="imageAlt || ''"
        loading="lazy"
        decoding="async" />
    </div>

    <div class="nued-card--content">
      <h4
        class="nued-card--title"
        v-if="hasTitle">
        {{ title }}
      </h4>

      <p
        class="nued-card--description"
        :class="{
          'is-clamped': clampLines > 0
        }"
        :style="{
          '--nued-car-clamp': String(clampLines)
        }"
        v-if="hasDescription">
        {{ description }}
      </p>

      <div
        class="nued-card--actions"
        v-if="clickMode === 'button'">
        <NuedButton
          class="nued-card--button"
          type="button"
          @click.stop="handleButtonClick"
          v-bind="mergedButtonProps">
          {{ effectiveButtonText }}
        </NuedButton>
      </div>
    </div>
  </component>
</template>

<style lang="scss" scoped>
  @use '@nued/styles/nued-colors' as *;

  .nued-card {
    background: $white;
    color: $black;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    box-shadow:
      0 1px 2px rgb(0 0 0 / .4)
      0 6px 14px rgb(0 0 0 / .6);
    transition: box-shadow .2s ease, transform .15s ease;

    &.is-card-action:not(.is-disabled) {
      cursor: pointer;

      &:hover {
        box-shadow:
          0 2px 6px rgb(0 0 0 / .6)
          0 12px 22px rgb(0 0 0 / .8);
        transform: translateY(-5px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    &.is-disabled {
      opacity: .6;
      pointer-events: none;
    }

    &--media {
      background: $lightgrey;
      width: 100%;
      max-height: 180px;
      aspect-ratio: 1;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }

    &--content {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      gap: .5rem;
      padding: 1rem;

      .nued-card--title {
        font-size: 1.15rem;
        font-weight: 600;
        margin: 0;
        line-height: 1.35;
      }

      .nued-card--description {
        color: $darkgrey-2;
        margin: 0;
        line-height: 1.55;

        &.is-clamped {
          display: -webkit-box;
          -webkit-line-clamp: var(--nued-card-clamp);
          line-clamp: var(--nued-card-clamp);
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .nued-card--actions {
        width: 100%;
        margin-top: auto;
        padding-top: .25rem;
        justify-content: center;
      }
    }
  }
</style>