<script setup>
  import { ref } from 'vue';
  import PlaygroundWrapper from '~/components/PlaygroundWrapper.vue';
  import Button from '~~/src/components/nued/Button.vue';

  const componentTitle = 'Button';
  const componentDescription = 'A customisable button.';

  const model = ref({
    size: 'medium',
    label: 'Click Me',
    variant: 'secondary',
    disabled: false,
    margin: '',
  });

  const controls = [
    { label: 'Size', type: 'select', options: [ 'small', 'medium', 'large' ], model: 'size' },
    { label: 'Label', type: 'text', model: 'label' },
    { label: 'Variant', type: 'select', options: [ 'primary', 'secondary', 'success', 'warning', 'danger' ], model: 'variant' },
    { label: 'Disabled', type: 'checkbox', model: 'disabled' },
    { label: 'Margin (CSS Shorthand)', type: 'text', model: 'margin' },
  ];

  const usageCode = `
    <NuedButton
      size='medium' // Choose from 'small' | 'medium' | 'large'. Default is set to 'medium'.
      variant='secondary' // Choose from 'primary' | 'secondary' | 'success' | 'warning' | 'danger'. Default is set to 'secondary'.
      disabled // Toggle between enabling/disabling the button. Default is false.
      margin='' // Set to '' by default. i.e. margin="0.5" | margin="2 1 2 1.5".
    >
      Click Me // Label text goes here
    </NuedButton>
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
      <Button
        :size="props.size"
        :variant="props.variant"
        :disabled="props.disabled"
        :margin="props.margin">
        {{ props.label }}
      </Button>
    </template>
  </PlaygroundWrapper>
</template>