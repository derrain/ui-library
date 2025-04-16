<script setup>
  import { ref, onMounted } from 'vue';

  const changelog = ref([]);

  function getVersionUpdate(version) {
    const [major, minor, patch] = version.replace('/^v/', '').split('.').map(Number);

    if (patch > 0) return 'h4';
    if (minor > 0) return 'h3';
    if (major > 0) return 'h2';
  }

  onMounted(async () => {
    try {
      const response = await fetch('/changelog.json')
      if (!response.ok) throw new Error('File not found')

      const data = await response.json()
      changelog.value = data
    } catch (error) {
      console.error('Failed to load changelog:', error)
    }
  });
</script>

<template>
  <section>
    <h2 class="page-header">What's New?</h2>
    <p>Find the latest updates to the NUED UI Component Library here</p>
  </section>

  <section class="version-update">
    <div
      v-for="entry in changelog"
      :key="entry.version">
      <component
        :is="getVersionUpdate(entry.version)"
        class="version-update--number">
        {{ entry.version }}
      </component>
      <ul>
        <li
          v-for="change in entry.changes"
          :key="change"
          class="version-update--change">
          {{ change }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  section {
    &.version-update {
      .version-update--number {
        color: $primary;
      }
    }
  }
</style>