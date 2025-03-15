<script lang="ts" setup>
  import type { InputProps } from '~~/src/types/input';

  const props = withDefaults(defineProps<InputProps>(), {
    fieldType: 'text',
    labelText: 'Sample label text',
    inputId: 'textSample',
    fieldValue: null,
    fieldSize: 'medium',
    isInline: false,
    showLabel: true,
    isRequired: true,
    requiredType: 'danger',
    requiredText: 'This field is required',
    disabled: false
  });

  const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div
    :class="[
        'nued-input',
        `nued-input--${props.fieldSize}`
      ]">
    <div
      :class="[
        'form-group',
        `nued-input--${props.isInline && props.fieldSize === 'large' ? 'inline' : undefined}`
      ]">
      <label
        :for="props.inputId"
        v-if="props.showLabel">
        {{ props.labelText }}
        <span
          v-if="props.isRequired"
          class="nued-input--required"> 
          *
        </span>
      </label>
      <input
        :id="props.inputId"
        :type="props.fieldType"
        :aria-label="props.labelText"
        :placeholder="
          !props.showLabel && props.isRequired ? `${props.labelText} *` :
          !props.showLabel ? props.labelText :
          ''
        "
        :value="props.fieldValue"
        :disabled="props.disabled"
      />
    </div>

    <span
      :class="`nued-input--${props.isRequired ?? props.requiredType}`">
      {{ props.requiredText }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
  @use "sass:color";
  @use '~/assets/colors' as *;

  .nued-input {
    color: $white;
    font-size: 1rem;
    display: grid;

    &.nued-input--small {
      width: calc(100% / 3);
      min-width: 100px;
    }

    &.nued-input--medium {
      width: calc(100% / 2);
      min-width: 300px;
    }

    &.nued-input--large {
      width: 100%;
    }

    .form-group {
      display: grid;

      label {
        margin-bottom: 5px;

        .nued-input--required {
          color: $red;
        }
      }

      input {
        font-size: 1rem;
        padding: .75rem 1rem;
        border-radius: 8px;
        border: 0;
      }

      &.nued-input--inline {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        align-items: center;
      }
    }

    .nued-input--warning {
      color: $orange;
    }
  }
</style>