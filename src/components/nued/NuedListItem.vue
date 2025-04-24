<script lang="ts" setup>
  import type { ListItemprops } from '../../types/list-item';

  const props = withDefaults(defineProps<ListItemprops>(), {
    title: '',
    body: '',
    layout: 'default',
    isClickable: false
  });

  function handleClick(event: MouseEvent | KeyboardEvent) {
    if (props.isClickable && typeof props.onClick === 'function') {
      props.onClick(event);
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (props.isClickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick(event);
    }
  }
</script>

<template>
  <div
    role="listitem"
    :class="[
      'nued-list-item',
      `nued-list-item--${layout}`,
      'nued-list-item--clickable'
    ]"
    v-if="isClickable"
    @click="handleClick"
    @keypress="handleKeyPress">
    <h4 class="nued-list-item--title">{{ title }}</h4>
    <p class="nued-list-item--body">{{ body }}</p>
  </div>

  <div
    role="listitem"
    :class="[
      'nued-list-item',
      `nued-list-item--${layout}`,
      'nued-list-item--unclickable'
    ]"
    v-else>
    <h4 class="nued-list-item--title">{{ title }}</h4>
    <p class="nued-list-item--body">{{ body }}</p>
  </div>
</template>

<style lang="scss" scoped>
  @use "sass:color";
  @use '../../../playground/assets/colors' as *;

  .nued-list-item {
    background: $white;
    color: $black;
    position: relative;
    padding: .5rem 1rem;
    border: 2px solid $lightgrey;
    border-bottom: 0;

    &:last-child {
      border-bottom: 2px solid $lightgrey;
      margin-bottom: 0;
    }

    &.nued-list-item {
      &--default {
        .nued-list-item--title {
          margin: .15rem 0;
          line-height: 1.5;
        }

        .nued-list-item--body {
          margin-bottom: .15rem;
        }
      }

      &--compressed {
        .nued-list-item--title {
          margin: 0;
        }

        .nued-list-item--body {
          margin: 0;
        }
      }

      &--clickable {
        pointer-events: auto;
        box-shadow: inset 0 -2px 3px 0 rgb(0 0 0 / .5);
        transition: .4s ease all;
        cursor: pointer;

        &:hover {
          background: color.adjust($black, $lightness: 85%);
        }
      }

      &--unclickable {
        pointer-events: none;
        box-shadow: none;
        cursor: default;

        &:hover {
          background: transparent;
        }
      }
    }

    .nued-list-item--title {
      font-size: 1rem;
      font-weight: 400;
    }

    .nued-list-item--body {
      font-size: .85rem;
      font-weight: 600;
      white-space: wrap;
      word-wrap: break-word;
    }
  }
</style>