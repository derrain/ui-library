<script setup>
  import { computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  // Dynamically get all pages except the 'Home' page
  const componentLinks = computed(() => {
    return router.getRoutes()
      .filter(r => r.path !== '/' && r.path !== '/playground')
      .map(r => ({
        name: r.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        path: r.path
      }));
  });

  // Manually prepend the 'Home' page as the first item on the sidebar and set to the default page
  const sidebarLinks = computed(() => [
    { name: 'Home', path: '/' },
    ...componentLinks.value
  ]);
</script>

<template>
  <aside>
    <ul>
      <li
        v-for="link in sidebarLinks"
        :key="link.path">
        <router-link
          :to="link.path"
          :class="{ active: route.path === link.path }">
          {{ link.name }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  aside {
    background: $darkgrey-1;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        display: block;

        a {
          color: $white;
          font-size: 1.2rem;
          font-weight: 400;
          display: block;
          padding: 1.5rem 3rem;
          text-decoration: none;

          &.active {
            background: $darkgrey-2;
            color: $primary;
          }
        }
      }
    }
  }
</style>