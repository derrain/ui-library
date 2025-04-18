<script lang="ts" setup>
  const config = useRuntimeConfig().public;
  const GITHUB_USERNAME = config.NUXT_PUBLIC_GITHUB_USERNAME;
  const GITHUB_REPO = config.NUXT_PUBLIC_GITHUB_REPO;

  console.warn('username:', GITHUB_USERNAME);

  const apiURL = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/releases`;

  const { data: releases, status, error } = useFetch(apiURL, {
    key: `github-releases-${GITHUB_USERNAME}-${GITHUB_REPO}`,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'X-GtiHub-Api-Version': '2022-11-28'
    },
    transform: (data) => {
      if (!Array.isArray(data)) return [];

      return data.map(release => ({
        id: release.id,
        tag_name: release.tag_name,
        name: release.name,
        published_at: release.published_at,
        body: release.body
      }));
    }
  });

  function formatDate(dateString: string | null): string {
    if (!dateString) return 'Date not available';

    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString;
    }
  }
</script>

<template>
  <section>
    <h2 class="page-header">What's New?</h2>
    <p>Find the latest updates of the NUED UI Component Library here.</p>
  </section>

  <section>
    <div
      v-if="status === 'pending'">
      <p>Loading changelog...</p>
    </div>

    <div
      v-else-if="error">
      <p>Could not load changelog. Please try again later.</p>
      <pre v-if="error.message">Error: {{ error.message }}</pre>
    </div>

    <div
      v-else-if="releases && releases.length > 0"
      v-for="release in releases"
      :key="release.id">
      <h3>{{ release.tag_name }} - {{ release.name || 'Untitled release' }}</h3>
      <p>{{ formatDate(release.published_at) }}</p>
      <ul>
        <li>{{ release.body || 'No description provided.' }}</li>
      </ul>
    </div>

    <p
      v-else>
      No releases found for NUED yet.
    </p>
  </section>
</template>

<style lang="scss" scoped>
  pre {
    white-space: wrap;
  }
</style>