<script setup>
  import { ref } from 'vue';
  import PlaygroundWrapper from '~/components/PlaygroundWrapper.vue';
  import { Button } from '~~/src';

  const componentTitle = 'Button';
  const componentDescription = 'A customisable button.';

  const model = ref({
    size: 'medium',
    label: 'Click Me',
    disabled: false
  });

  const controls = [
    { label: 'Size', type: 'select', options: [ 'small', 'medium', 'large' ], model: 'size' },
    { label: 'Label', type: 'text', model: 'label' },
    { label: 'Disabled', type: 'checkbox', model: 'disabled' }
  ];

  const usageCode = `
    <NuedButton
      size='medium' // Choose from 'small' | 'medium' | 'large'. Default is set to 'medium'.
      disabled // Disable the button
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
      <Button :size="props.size" :disabled="props.disabled">
        {{ props.label }}
      </Button>
    </template>
  </PlaygroundWrapper>
</template>