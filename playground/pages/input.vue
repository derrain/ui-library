<script setup>
  import { ref } from 'vue';
  import PlaygroundWrapper from '~/components/PlaygroundWrapper.vue';
  import Input from '~~/src/components/nued/Input.vue';
  import NuedButton from '~~/src/components/nued/Button.vue'

  const componentTitle = 'Input';
  const componentDescription = 'An input field that can be customised according to type, size and other properties.';

  const model = ref({
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

  const controls = [
    { label: 'Input Type', type: 'select', options: [ 'text', 'email', 'number', 'password', 'tel', 'date', 'time' ], model: 'fieldType' },
    { label: 'Label Text', type: 'text', model: 'labelText' },
    { label: 'Input ID', type: 'text', model: 'inputId' },
    { label: 'Input Size', type: 'select', options: [ 'small', 'medium', 'large' ], model: 'fieldSize' },
    { label: 'Inline', type: 'checkbox', model: 'isInline' },
    { label: 'Show Label', type: 'checkbox', model: 'showLabel' },
    { label: 'Required', type: 'checkbox', model: 'isRequired' },
    { label: 'Required Style', type: 'select', options: [ 'warning', 'danger' ], model: 'requiredType' },
    { label: 'Required Text', type: 'text', model: 'requiredText' },
    { label: 'Disabled', type: 'checkbox', model: 'disabled' },
  ];

  const usageCode = `
    <Input
      inputId='textSample' // Apply a unique string.
      fieldType='text' // Choose from 'text' | 'email' | 'number' | 'password' | 'tel' | 'date' | 'time'. Default is set to 'text'.
      labelText='Sample label text' // Set a string value as the label text.
      fieldValue=null // Depending on the type of the input field key in value. Default is <em>null</em>
      fieldSize='medium' // Choose between 'small' | 'medium' | 'large'. Defaul value is 'medium'.
      isInline=false // Toggle between block or inine label and input field. By default, inline is toggled off.
      showLabel=true // Toggle between showing or hiding the label text. By default the label text is visible.
      isRequired=true // Toggle between required and optional input fields. Default is set to true.
      requiredType='danger' // Choose between 'warning' | 'danger' styles. Default is set to 'danger'.
      requiredText='This field is required' // Provide a custom error message here.
      disabled=false // Disable the input field. Default is set to false.
    />
  `;
</script>

<template>
  <PlaygroundWrapper
    :title="componentTitle"
    :description="componentDescription"
    :controls="controls"
    :model="model"
    :usageCode="usageCode"
  >
    <template #default="{ props }">
      <Input
        :inputId="props.inputId"
        :fieldType="props.fieldType"
        :labelText="props.labelText"
        :fieldValue="props.fieldValue"
        :fieldSize="props.fieldSize"
        :isInline="props.isInline"
        :showLabel="props.showLabel"
        :isRequired="props.isRequired"
        :requiredType="props.requiredType"
        :requiredText="props.requiredText"
        :disabled="props.disabled"
      />

      <div>
        <NuedButton
          variant="primary">
          Submit
        </NuedButton>
      </div>
    </template>
  </PlaygroundWrapper>
</template>