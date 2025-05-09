<script setup>
  import { ref, watch } from 'vue';
  import PlaygroundWrapper from '~/components/PlaygroundWrapper.vue';
  import NuedAlert from '~~/src/components/nued/NuedAlert.vue';
  import NuedButton from '~~/src/components/nued/NuedButton.vue';

  const componentTitle = 'Alert';
  const componentDescription = 'A customisable alert component with different status variants, to display useful information to your users.';

  const model = ref({
    label: 'This is a sample alert text!',
    variant: 'info',
    dismissible: false,
    autoDismiss: false,
    autoDismissInterval: 5000,
    margin: '',
  });

  const isAlertVisible = ref(true);
  const alertKey = ref(0);

  const showAlert = () => {
    isAlertVisible.value = true;
  };

  const controls = [
    { label: 'Label', type: 'text', model: 'label' },
    { label: 'Variant', type: 'select', options: [ 'info', 'success', 'warning', 'danger' ], model: 'variant' },
    { label: 'Dismissible', type: 'checkbox', model: 'dismissible' },
    { label: 'Auto Dismiss', type: 'checkbox', model: 'autoDismiss' },
    { label: 'Dismiss Interval', type: 'text', model: 'autoDismissInterval' },
    { label: 'Margin (CSS Shorthand)', type: 'text', model: 'margin' },
  ];

  const usageCode = `
    <NuedAlert
      variant='info' // Choose from 'info' | 'success' | 'warning' | 'danger'. Default is set to 'info'.
      dismissible=false // Enable/disable dismiss button. Default is set to false.
      autoDismiss=false // Enable/disable auto dismiss. Default is set to false.
      autoDismissInterval=5000 // Number in milliseconds. Default is 5000 if 'autoDismiss' is enabled.
      margin='' // Set to '' by default. i.e. margin="0.5" | margin="2 1 2 1.5".
    >
      This is a sample alert text!
    </NuedAlert>
  `;

  watch(model, () => {
    alertKey.value++;
  });
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
      <NuedButton @click="showAlert" style="width: fit-content;">
        Show Alert
      </NuedButton>

      <NuedAlert
        v-if="isAlertVisible"
        :key="alertKey"
        :variant="props.variant"
        :dismissible="props.dismissible"
        :autoDismiss="props.autoDismiss"
        :autoDismissInterval="props.autoDismissInterval"
        :margin="props.margin"
        :padding="props.padding"
        @dismiss="isAlertVisible = false">
        {{ props.label }}
      </NuedAlert>
    </template>
  </PlaygroundWrapper>
</template>