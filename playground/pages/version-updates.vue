<script lang="ts" setup>
  const config = useRuntimeConfig().public;
  const GITHUB_USERNAME = config.NUXT_PUBLIC_GITHUB_USERNAME;
  const GITHUB_REPO = config.NUXT_PUBLIC_GITHUB_REPO;

  const apiURL = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/releases`;

  const { data: releases, status, error } = useFetch(apiURL, {
    key: `github-releases-${GITHUB_USERNAME}-${GITHUB_REPO}`,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    transform: async (data) => {
      if (!Array.isArray(data)) return [];

      const enriched = await Promise.all(
        data.map(async (release) => {
          try {
            const tagRef = await $fetch<{
              object: { sha: string; type: string }
            }>(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/git/ref/tags/${release.tag_name}`,
              {
                headers: {
                  'Accept': 'application/vnd.github.v3+json',
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              }
            );

            let commitSha = tagRef.object.sha;

            if (tagRef.object.type === 'tag') {
              const tagObject = await $fetch<{
                object: { sha: string; type: string }
              }>(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/git/tags/${tagRef.object.sha}`,
                {
                  headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                  }
                }
              );

              if (tagObject.object.type === 'commit') {
                commitSha = tagObject.object.sha;
              }
            }

            const commitRes = await $fetch<{
              commit: {
                author: {
                  date: string
                }
              }
            }>(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/commits/${commitSha}`,
              {
                headers: {
                  'Accept': 'application/vnd.github.v3+json',
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              }
            );

            return {
              id: release.id,
              tag_name: release.tag_name,
              name: release.name,
              published_at: commitRes.commit.author.date,
              body: release.body
            };
          } catch (e) {
            console.warn('Failed to fetch commit info for', release.tag_name);
            return {
              id: release.id,
              tag_name: release.tag_name,
              name: release.name,
              published_at: release.published_at,
              body: release.body
            };
          }
        })
      );

      return enriched;
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

  <section class="release-notes-section">
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
      <ul
        v-if="release.body">
        <li
          v-for="(line, index) in release.body.split('\n').filter((line: string) => line.trim().startsWith('-'))"
          :key="index">
          {{ line.replace(/^-+/, '').trim() }}
        </li>
      </ul>
      <p
        v-else>
        No description provided.
      </p>
    </div>

    <p
      v-else>
      No releases found for NUED yet.
    </p>
  </section>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  .release-notes-section {
    > div {
      background: $darkgrey-1;
      width: 100%;
      min-height: 10px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-bottom: 1rem;
      padding: 1rem;
      border: 1px solid $black;
      border-radius: 8px;
      box-sizing: border-box;

      pre {
        margin: 0;
        white-space: wrap;
      }

      h3 {
        font-size: 1.15rem;
        color: $primary;
        margin-bottom: .5rem;
      }

      p {
        font-size: 1rem;
        color: $lightgrey;
      }

      ul {
        li {
          font-size: 1rem;
          line-height: 1.5;
        }
      }
    }
  }
</style>