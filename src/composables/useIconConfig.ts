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
  alarm: 'ph:alarm-fill',
  'alarm-alt': 'ph:alarm-thin',
  cursor: 'ph:cursor-click-fill',
  'cursor-alt': 'ph:cursor-click-thin',
  globe: 'ph:globe-fill',
  'globe-alt': 'ph:globe-thin',
  history: 'material-symbols-light:update-rounded',
  home: 'ph:house-fill',
  'home-alt': 'ph:house-thin',
  info: 'ph:info-fill',
  'info-alt': 'ph:info-thin',
  layout: 'ph:layout-fill',
  'layout-alt': 'ph:layout-thin',
  question: 'ph:question-fill',
  'question-alt': 'ph:question-thin',
  star: 'ph:star-fill',
  'star-alt': 'ph:star-thin',
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