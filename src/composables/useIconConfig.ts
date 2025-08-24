import { ref } from 'vue';
// import { addCollection } from '@iconify/vue';
// import type { IconifyJSON } from '@iconify/types';
// import phIcons from '@iconify-json/ph/icons.json';
import type { Ref } from 'vue';

interface CustomIconMap {
  [key: string]: string;
}

const customIcons: Ref<CustomIconMap> = ref({
  accessibility: 'iconoir:accessibility',
  accordion: 'iconoir:playlist-plus',
  alarm: 'ph:alarm-fill',
  'alarm-alt': 'ph:alarm-thin',
  calendar: 'ph:calendar-dots-fill',
  'calendar-alt': 'ph:calendar-dots-thin',
  card: 'hugeicons:insert-top-image',
  carousel: 'ph:slideshow-fill',
  'carousel-alt': 'ph:slideshow-thin',
  checkbox: 'ph:check-square-fill',
  'checkbox-alt': 'ph:check-square-thin',
  'chevron-down': 'prime:chevron-down',
  'chevron-up': 'prime:chevron-up',
  clock: 'ph:clock-fill',
  'clock-alt': 'ph:clock-thin',
  cursor: 'ph:cursor-click-fill',
  'cursor-alt': 'ph:cursor-click-thin',
  dropdown: 'ph:arrow-square-down-fill',
  'dropdown-alt': 'ph:arrow-square-down-thin',
  globe: 'ph:globe-fill',
  'globe-alt': 'ph:globe-thin',
  history: 'material-symbols-light:update-rounded',
  home: 'ph:house-fill',
  'home-alt': 'ph:house-thin',
  info: 'ph:info-fill',
  'info-alt': 'ph:info-thin',
  layout: 'ph:layout-fill',
  'layout-alt': 'ph:layout-thin',
  list: 'ph:list-bullets-fill',
  'list-alt': 'ph:list-bullets-thin',
  notification: 'ph:notification-fill',
  'notification-alt': 'ph:notification-thin',
  pagination: 'lineicons:pagination',
  question: 'ph:question-fill',
  'question-alt': 'ph:question-thin',
  radio: 'ph:radio-button-fill',
  'radio-alt': 'ph:radio-button-thin',
  spinner: 'material-symbols-light:progress-activity-sharp',
  star: 'ph:star-fill',
  'star-alt': 'ph:star-thin',
  switch: 'ph:toggle-right-thin',
  'switch-alt': 'ph:toggle-right-thin',
  table: 'ph:table-fill',
  'table-alt': 'ph:table-thin',
  textarea: 'bi:textarea-resize',
  textbox: 'ph:textbox-fill',
  'textbox-alt': 'ph:textbox-thin',
  toolkit: 'et:tools'
});

// let added = false;

export function useIconConfig() {
  // if (!added) {
  //   // addCollection(phIcons as IconifyJSON);
  //   // added = true;
  // }

  return { customIcons };
}