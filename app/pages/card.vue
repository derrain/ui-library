<script setup>
  import { ref, watch } from 'vue';
  import PlaygroundWrapper from '~/components/PlaygroundWrapper.vue';
  import NuedCard from '~~/src/components/nued/NuedCard.vue';
  import NuedButton from '~~/src/components/nued/NuedButton.vue';

  const componentTitle = 'Card';
  const componentDescription = 'Versatile card supporting text-only or image+text, optional clamping, and clickable behavior.';

  const model = ref({
    title: 'A very pretty card',
    body: 'This card supports an optional image (square or landscape), clamped text, and can be clickable or a link.',
    showImage: true,
    imageSrc: 'https://images.unsplash.com/photo-1658054041772-f3aedb276eda?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNvb3RoaW5nJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHwy',
    imageAlt: 'Unsplash sample image',
    imageCrop: 'landscape',
    imageWrapperPadding: '',
    clampLines: 3,
    isClickable: false,
    isLink: false,
    href: '',
    target: '_self',
    rel: 'noopener noreferrer',
    contentPadding: '1rem'
  });

  watch(() => model.value.isClickable, (val) => {
    if (val)
      model.value.isLink = false;
  });

  watch(() => model.value.isLink, (val) => {
    if (val)
      model.value.isClickable = false;
  });

  const handleClick = () => {
    alert('Card clicked!');
  };

  const controls = [
    { label: 'Title', type: 'text', model: 'title' },
    { label: 'Body', type: 'text', model: 'body' },
    { label: 'Image Src', type: 'text', model: 'imageSrc' },
    { label: 'Image Alt', type: 'text', model: 'imageAlt' },
    { label: 'Image Crop', type: 'select', options: ['landscape', 'square'], model: 'imageCrop' },
    { label: 'Image Padding', type: 'text', model: 'imageWrapperPadding' },
    { label: 'Clamp Lines', type: 'text', model: 'clampLines' },
    { label: 'Clickable Card', type: 'checkbox', model: 'isClickable' },
    { label: 'Link Card', type: 'checkbox', model: 'isLink' },
    { label: 'URL', type: 'text', model: 'href' },
    { label: 'Link Target', type: 'select', options: ['_self', '_blank'], model: 'target' },
    { label: 'Content Padding', type: 'text', model: 'contentPadding' },
  ];

  const usageCode = `
    <NuedCard
      title="A very pretty card"
      body="This card supports an optional image (square or landscape), clamped text, and can be clickable or a link."
      imageSrc="https://example.com/image.jpg"
      imageAlt="Descriptive alt"
      imageCrop="landscape"          // "square" | "landscape"
      imageWrapperPadding=""         // e.g. "0.5rem"
      clampLines={3}                 // number; 0 = no clamp
      isClickable={false}            // mutually exclusive with isLink
      :clickEvent="handleClick"      // only if isClickable = true
      isLink={true}                  // mutually exclusive with isClickable
      href="https://nued.design"     // only if isLink = true
      target="_blank"
      rel="noopener noreferrer"
      contentPadding="1rem"
    >
      <template #actions>
        <NuedButton size="small" variant="primary">Learn more</NuedButton>
      </template>
    </NuedCard>
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
      <div class="card-grid">
        <NuedCard
          :title="props.title"
          :body="props.body"
          :imageSrc="props.imageSrc"
          :imageAlt="props.imageAlt"
          :imageCrop="props.imageCrop"
          :imageWrapperPadding="props.imageWrapperPadding"
          :clampLines="Number(props.clampLines) || 0"
          :isClickable="props.isClickable"
          :clickEvent="props.isClickable ? handleClick : undefined"
          :isLink="props.isLink"
          :href="props.href"
          :target="props.target"
          :rel="props.rel"
          :contentPadding="props.contentPadding"
        />

        <NuedCard
          :title="props.title + ' (2)'"
          :body="props.body + ' Extra content to show clamping in action when lines overflow.'"
          :imageSrc="props.imageSrc"
          :imageAlt="props.imageAlt"
          :imageCrop="props.imageCrop"
          :imageWrapperPadding="props.imageWrapperPadding"
          :clampLines="Number(props.clampLines) || 0"
          :isClickable="props.isClickable"
          :clickEvent="props.isClickable ? handleClick : undefined"
          :isLink="props.isLink"
          :href="props.href"
          :target="props.target"
          :rel="props.rel"
          :contentPadding="props.contentPadding"
        />

        <NuedCard
          :title="props.title + ' (3)'"
          :body="props.body"
          :imageSrc="''"
          :clampLines="Number(props.clampLines) || 0"
          :isClickable="props.isClickable"
          :clickEvent="props.isClickable ? handleClick : undefined"
          :isLink="props.isLink"
          :href="props.href"
          :target="props.target"
          :rel="props.rel"
          :contentPadding="props.contentPadding"
        />
      </div>
    </template>
  </PlaygroundWrapper>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  .card-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: stretch; /* make children stretch so height:100% works */

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    /* ensure cards fill the grid area */
    :deep(.nued-card) {
      height: 100%;
    }
  }
</style>