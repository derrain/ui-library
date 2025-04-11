<script lang="ts" setup>
  import { ref, watch } from 'vue';
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
    requiredText: '',
    disabled: false
  });

  const emit = defineEmits(['update:modelValue']);

  const inputValue = ref(props.fieldValue);
  const errorMessage = ref('');

  const validateInput = () => {
    const value = inputValue.value?.toString().trim() || '';

    if (!value) {
      errorMessage.value = props.isRequired ? 'This field is required' : '';
      return;
    }

    switch (props.fieldType) {
      case 'email':
        errorMessage.value = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : props.requiredText || 'Invalid email format';
        break;
      
      case 'number':
        errorMessage.value = /^\d+$/.test(value) ? '' : props.requiredText || 'Only numbers are allowed';
        break;

      case 'tel':
        errorMessage.value = /^\+?\d{7,15}$/.test(value) ? '' : props.requiredText || 'Invalid phone number';
        break;
      
      case 'date':
        errorMessage.value = /^\d{4}-\d{2}-\d{2}$/.test(value) ? '' : props.requiredText || 'Invalid date format (mm/dd/yyyy)';
        break;
      
      case 'time':
        errorMessage.value = /^([01]\d|2[0-3]):([0-5]\d)$/.test(value) ? '' : props.requiredText || 'Invalid time format (HH:mm)';
        break;
      
      default:
        errorMessage.value = '';
        break;
    }
  };

  watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue);
    validateInput();
  });
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
        `nued-input--${props.isInline ? 'inline' : undefined}`
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
        v-model="inputValue"
        :disabled="props.disabled"
        @input="validateInput"
        @blur="validateInput"
      />
    </div>

    <span
      :class="`nued-input--${props.requiredType}`"
      v-if="errorMessage">
      {{ errorMessage }}
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

    &--small {
      width: calc(100% / 3);
      min-width: 100px;
    }

    &--medium {
      width: calc(100% / 2);
      min-width: 300px;
    }

    &--large {
      width: 100%;
    }

    .form-group {
      display: grid;

      label {
        margin-right: 0;
        margin-bottom: 5px;

        .nued-input--required {
          color: $red;
        }
      }

      input {
        font-size: 1rem;
        width: 100%;
        padding: .75rem 1rem;
        border-radius: 8px;
        border: 0;
        box-sizing: border-box;

        &[type="date"],
        &[type="time"] {
          font-family: 'Manjari', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      }

      &.nued-input--inline {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        align-items: center;

        label {
          margin-right: 1rem;
          margin-bottom: 0;
        }
      }
    }

    &--danger,
    &--warning {
      margin-top: 10px;
    }

    &--danger {
      color: $red;
    }

    &--warning {
      color: $orange;
    }
  }
</style>