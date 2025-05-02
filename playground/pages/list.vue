<script setup>
  import { ref, nextTick } from 'vue';
  import PlaygroundWrapper from '~/components/PlaygroundWrapper.vue';
  import NuedList from '~~/src/components/nued/NuedList.vue';
  import NuedListItem from '~~/src/components/nued/NuedListItem.vue';
  import NuedNotification from '~~/src/components/nued/NuedNotification.vue';

  const componentTitle = 'List and List Item';
  const componentDescription = 'Used primarily to display items in a list format.';

  const model = ref({
    title: 'This is sample title text',
    body: 'This is sample body text',
    layout: 'default',
    isClickable: false,
    showIcon: false,
    iconName: '',
    viewHeight: 'small',
    viewWidth: 'small',
  });

  const controls = [
    { label: 'List Height', type: 'select', options:['small', 'medium', 'large'], model: 'viewHeight' },
    { label: 'List Width', type: 'select', options:['small', 'medium', 'large'], model: 'viewWidth' },
    { label: 'Title', type: 'text', model: 'title' },
    { label: 'Body Text', type: 'text', model: 'body' },
    { label: 'Layout', type: 'select', options: ['default', 'compressed'], model: 'layout' },
    { label: 'Is Clickable?', type: 'checkbox', model: 'isClickable' },
    { label: 'Show Icon', type: 'checkbox', model: 'showIcon' },
    { label: 'Icon Name', type: 'text', model: 'iconName' },
  ];

  const usageCode = `
    <NuedList
      viewHeight='small' // Choose between 'small' | 'medium' | 'large' heights. Default is set to 'small'.
      viewWidth='small' // Choose between 'small' | 'medium' | 'large' widths. Default is set to 'small'.
    >
      <NuedListItem
        title='' // Input a string value which appears first within a list item. Default is ''.
        body='' // This is the longer or more descriptive text in the list item. Default is ''.
        layout='default' // Choose between 'default' | 'compressed' layouts. Default is set to 'default'.
        isClickable=false // Toggle between clickable or unclickable list items. Default is false.
        @click='handleClick(parameters)' // If 'isClickable' is enabled, use 'handleClick' function to trigger an event.
        showIcon=false // Toggle between show/hide of an icon. DEPENDENT ON AN ICON NAME!
        iconName='' // By default set to '', you can provide the full name or alias of any icon in the 'Icon' page.
      />
    </NuedList>
  `;

  const showNotification = ref(false);
  const notificationContent = ref('');

  const handleClick = (itemNumber) => () => {
    showNotification.value = false;

    nextTick(() => {
      notificationContent.value = `Item ${itemNumber} clicked!`;
      showNotification.value = true;
    });
  }
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
      <NuedNotification
        title="Click triggered!"
        :message="notificationContent"
        :dismissible="true"
        v-if="showNotification" />

      <NuedList
        :viewHeight="props.viewHeight"
        :viewWidth="props.viewWidth">
        <NuedListItem
          v-for="i of 10"
          :key="i"
          :title="props.title + i"
          :body="props.body + i"
          :layout="props.layout"
          :isClickable="props.isClickable"
          :onClick="handleClick(i)"
          :showIcon="props.showIcon"
          :iconName="props.iconName"
        />
      </NuedList>
    </template>
  </PlaygroundWrapper>
</template>