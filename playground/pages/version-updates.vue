<script lang="ts" setup>
import { ref, onMounted } from 'vue';

type Release = {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
};

const releases = ref<Release[]>([]);

// Helper to format published_at
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(async () => {
  const res = await fetch('/api/releases');
  releases.value = await res.json();
});
</script>

<template>
  <section>
    <h2 class="page-header">What's New?</h2>
    <p>Find the latest updates of the NUED UI Component Library here.</p>
  </section>

  <section>
    <div
      v-if="releases.length"
      v-for="release in releases"
      :key="release.id">
      <h3>{{ release.tag_name }} - {{ release.name || 'Untitled release' }}</h3>
      <p>{{ formatDate(release.published_at) }}</p>
      <ul>
        <li>{{ release.body || 'No description provided.' }}</li>
      </ul>
    </div>
    <p v-else>Loading changelog...</p>
  </section>

  <!-- <div class="changelog">
    <h2 class="text-2xl font-bold mb-4">📦 Changelog</h2>
    <ul v-if="releases.length">
      <li
        v-for="release in releases"
        :key="release.id"
        class="mb-6 p-4 border rounded bg-white dark:bg-gray-900 shadow"
      >
        <h3 class="text-xl font-semibold">
          {{ release.tag_name }} - {{ release.name || 'Untitled release' }}
        </h3>
        <p class="text-gray-600 text-sm mb-2">
          {{ formatDate(release.published_at) }}
        </p>
        <p class="whitespace-pre-wrap">
          {{ release.body || 'No description provided.' }}
        </p>
      </li>
    </ul>
    <p v-else>Loading changelog...</p>
  </div> -->
</template>