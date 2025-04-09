<script setup>
  import { ref } from 'vue';
  import PlaygroundWrapper from '~/components/PlaygroundWrapper.vue';
  import NuedIcon from '~~/src/components/nued/NuedIcon.vue';
  import { useIconConfig } from '~~/src/composables/useIconConfig';

const componentTitle = 'Icon';
const componentDescription = '';

  const model = ref({
    color: 'inherit',
    size: 'medium',
  });

  const { customIcons } = useIconConfig();
  const copiedMessage = ref('');
  const showCopiedMessage = ref(false);

  const copyIconName = (iconName) => {
    navigator.clipboard.writeText(iconName);
    copiedMessage.value = `"${iconName}" copied!`;
    showCopiedMessage.value = true;
    setTimeout(() => {
      showCopiedMessage.value = false;
    }, 2000);
  }

  const controls = [
    { label: 'Color', type: 'text', model: 'color' },
    { label: 'Size', type: 'select', options: [ 'small', 'medium', 'large' ], model: 'size' },
  ];

  const usageCode = `
    <NuedIcon
      color='inherit' // Provide a Hex or RGB color. Default is set to 'inherit'.
      size='medium' // Choose between 'small' | 'medium' | 'large'. Default is 'medium'.
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
      <div class="icon-grid">
        <div
          v-for="(iconifyName, customName) in customIcons"
          :key="customName"
          class="icon-item"
          @click="copyIconName(customName)"
          :title="`Click to copy ${customName}`">
          <ClientOnly>
            <NuedIcon
              :name="customName"
              :color="props.color"
              :size="props.size"
            />
          </ClientOnly>
          <span class="icon-name">{{ customName }}</span>
        </div>
      </div>
    </template>
  </PlaygroundWrapper>
</template>

<style lang="scss" scoped>
  .icon-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 1rem;

    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: .5rem;
      border: 1px solid rgb(255 255 255 / .15);
      border-radius: 4px;
      text-align: center;
      transition: transform .4s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }

      .icon-name {
        font-size: 1rem;
        display: block;
        margin-top: 1rem;
        word-break: break-word;
      }
    }
  }
</style>