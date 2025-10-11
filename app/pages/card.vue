<script setup>
  import { ref, watch } from 'vue';
  import PlaygroundWrapper from '../components/PlaygroundWrapper.vue';
  import NuedCardGroup from '~~/src/components/nued/NuedCardGroup.vue';
  import NuedCard from '~~/src/components/nued/NuedCard.vue';

  const componentTitle = 'Card';
  const componentDescription = 'Cards with optional image, title and description. Supports clamped text, grid layout and clickable card/button actions';

  const model = ref({
    // Card group props
    columns: 3,
    clampLines: 3,
    clickMode: 'none',
    gap: '1rem',
    groupButtonText: 'View',

    // Card props
    title: 'Sample Card',
    description: 'This is some sample description text to demonstrate line clamping and equal height cards in the group.',
    imageSrc: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2474',
    imageAlt: 'Foggy mountain summit',
    disabled: false,
    cardButtonText: 'More'
  });

  const demoKey = ref(0);

  watch(model, () => {
    demoKey.value++;
  }, {
    deep: true
  });

  const handleCardClick = (idx) => {
    alert(`[Card click] index=${idx}`);
  };

  const handleButtonClick = (idx) => {
    alert(`[Button click] index=${idx}`);
  };

  let i = 0;

  const controls = [
    { label: 'Columns', type: 'select', options: [1, 2, 3, 4], model: 'columns' },
    { label: 'Clamp Lines (0 = off)', type: 'text', model: 'clampLines' },
    { label: 'Click Mode', type: 'select', options: ['none', 'card', 'button'], model: 'clickMode' },
    { label: 'Gap (CSS)', type: 'text', model: 'gap' },
    { label: 'Group Button Text', type: 'text', model: 'groupButtonText' },

    { label: 'Title', type: 'text', model: 'title' },
    { label: 'Description', type: 'text', model: 'description' },
    { label: 'Image URL', type: 'text', model: 'imageSrc' },
    { label: 'Image Alt', type: 'text', model: 'imageAlt' },
    { label: 'Disabled', type: 'checkbox', model: 'disabled' },
    { label: 'Button Text', type: 'text', model: 'cardButtonText' },
  ];

  const usageCode = `
    <NuedCardGroup
      columns=3 // Number of cards per row
      clampLines=3 // Lines to clamp description (0 = no clamp)
      clickMode="none" // Choose between 'none' | 'card' | 'button'. Default is 'none'
      gap="1rem" // Gaps between cards
      buttonText="View" // Button text for all cards when clickMode="button"
    >
      <NuedCard
        imageSrc="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2474" // Image source URL
        imageAlt="Foggy mountain summit" // Alt text for screen readers
        title="Card Title" // Title that appears below the image
        description="Card description..." // Additional or extended information
        disabled="false" // If set to 'true', card will look disabled. Default is 'false'
        buttonText="View" // Button text for individual cards
        :onClick="() => console.log('Card clicked!')" // Handles card click functions
        :onButtonClick="() => console.log('Button clicked!')" // Handles button click functions
      />
    </NuedCardGroup>
  `;
</script>

<template>
  <PlaygroundWrapper
    :title="componentTitle"
    :description="componentDescription"
    :controls="controls"
    :model="model"
    :usageCode="usageCode">
    <template #default="{ props }">
      <NuedCardGroup
        :key="demoKey"
        :columns="Number(props.columns)"
        :clampLines="Number(props.clampLines)"
        :clickMode="props.clickMode"
        :gap="props.gap"
        :buttonText="props.buttonText">
        <NuedCard
          v-for="i in 6"
          :key="i"
          :imageSrc="props.imageSrc"
          :imageAlt="props.imageAlt"
          :title="props.title"
          :description="props.description"
          :disabled="props.disabled"
          :buttonText="props.cardButtonText || props.groupButtonText"
          :onClick="props.clickMode === 'card' ? () => handleCardClick(i - 1) : undefined"
          :onButtonClick="props.clickMode === 'button' ? () => handleButtonClick(i - 1) : undefined"
        />
      </NuedCardGroup>
    </template>
  </PlaygroundWrapper>
</template>