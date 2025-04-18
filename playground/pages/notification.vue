<script lang="ts" setup>
  import { ref } from 'vue';
  import PlaygroundWrapper from '~/components/PlaygroundWrapper.vue';
  import NuedNotification from '~~/src/components/nued/NuedNotification.vue';
  import NuedButton from '~~/src/components/nued/NuedButton.vue';

  const componentTitle = 'Notification';
  const componentDescription = 'Can be customised to trigger a push notification upon user actions.';

  const model = ref({
    title: 'This is a notification',
    message: 'Yay! You performed an action!',
    position: 'right',
    variant: 'info',
    dismissible: false,
    autoDismissInterval: 5000
  });

  const isNotificationVisible = ref(false);

  const showNotification = () => {
    isNotificationVisible.value = true;
  };

  const controls = [
    { label: 'Title', type: 'text', model: 'title' },
    { label: 'Message', type: 'text', model: 'message' },
    { label: 'Position', type: 'select', options: ['left', 'center', 'right'], model: 'position' },
    { label: 'Variant', type: 'select', options: ['info', 'success', 'warning', 'danger'], model: 'variant' },
    { label: 'Dismissible', type: 'checkbox', model: 'dismissible' },
    { label: 'Dismiss Interval', type: 'text', model: 'autoDismissInterval' },
  ];

  const usageCode = `
    <NuedNotification
      title='' // Set to '' by default, this is the notification title.
      message='' // Set to '' by default, this is the body of the notification with more detailed information.
      position='right' // Choose between 'left' | 'center' | 'right' to align the nofication. Default is 'right'.
      variant='info' // Choose between 'info' | 'success' | 'warning' | 'danger'. Default is 'info'.
      dismissible=false // Set to fale by default, toggle between manual dismissal of the notification.
      autoDismissInterval=5000 Set to 5000 by default, customise the time after which the notification is dismissed.
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
      <NuedButton
        @click="showNotification"
        style="width: fit-content;">
        Show Notification
      </NuedButton>

      <NuedNotification
        v-if="isNotificationVisible"
        :title="props.title"
        :message="props.message"
        :position="props.position"
        :variant="props.variant"
        :dismissible="props.dismissible"
        :autoDismissInterval="props.autoDismissInterval"
        @dismiss="isNotificationVisible = false"
      />
    </template>
  </PlaygroundWrapper>
</template>