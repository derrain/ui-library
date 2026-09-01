<script lang="ts" setup>
  import { ref } from 'vue';
  import PlaygroundWrapper from '~/components/PlaygroundWrapper.vue';
  import NuedNotification from '~~/src/components/nued/NuedNotification.vue';
  import NuedButton from '~~/src/components/nued/NuedButton.vue';

  const componentTitle = 'Notification';
  const componentDescription = 'Can be customised to trigger push notifications upon user actions.';

  const model = ref({
    title: 'This is a notification',
    message: 'Yay! You performed an action!',
    showIcon: false,
    iconName: '',
    position: 'right',
    variant: 'info',
    dismissible: false,
    autoDismissInterval: 5000
  });

  const notificationRef = ref<InstanceType<typeof NuedNotification> | null>(null);

  const showNotification = () => {
    notificationRef.value?.show();
  };

  const controls = [
    { label: 'Title', type: 'text', model: 'title' },
    { label: 'Message', type: 'text', model: 'message' },
    { label: 'Show Icon', type: 'checkbox', model: 'showIcon' },
    { label: 'Icon Name', type: 'text', model: 'iconName' },
    { label: 'Position', type: 'select', options: ['left', 'right'], model: 'position' },
    { label: 'Variant', type: 'select', options: ['info', 'success', 'warning', 'danger'], model: 'variant' },
    { label: 'Dismissible', type: 'checkbox', model: 'dismissible' },
    { label: 'Dismiss Interval', type: 'text', model: 'autoDismissInterval' },
  ];

  const usageCode = `
    <NuedNotification
      ref="notificationRef"
      title="" // Set to '' by default, this is the notification title.
      message="" // Set to '' by default, this is the body of the notification with more detailed information.
      showIcon=false // Toggle between show/hide of an icon. DEPENDENT ON AN ICON NAME!
      iconName="" // By default set to '', you can provide the full name or alias of any icon in the 'Icon' page.
      position="right" // Choose between 'left' | 'right'. Default is 'right'.
      variant="info" // Choose between 'info' | 'success' | 'warning' | 'danger'. Default is 'info'.
      dismissible=false // Set to false by default, toggle manual dismissal of notifications.
      autoDismissInterval=5000 // Set to 5000 by default, customise the time after which notifications are dismissed.
    />

    <NuedButton @click="notificationRef?.show()">
      Show Notification
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
      <NuedButton
        @click="showNotification"
        style="width: fit-content;"
      >
        Show Notification
      </NuedButton>

      <NuedNotification
        ref="notificationRef"
        :title="props.title"
        :message="props.message"
        :showIcon="props.showIcon"
        :iconName="props.iconName"
        :position="props.position"
        :variant="props.variant"
        :dismissible="props.dismissible"
        :autoDismissInterval="Number(props.autoDismissInterval)"
      />
    </template>
  </PlaygroundWrapper>
</template>