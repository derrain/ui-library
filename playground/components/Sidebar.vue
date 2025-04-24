<script setup>
  import { computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import NuedIcon from '~~/src/components/nued/NuedIcon.vue';

  const router = useRouter();
  const route = useRoute();

  const routeIcons = {
    '/': 'home-alt',
    '/about': 'info-alt',
    '/version-updates': 'history',
    '/alert': 'alarm-alt',
    '/button': 'cursor-alt',
    '/icon': 'star-alt',
    '/input': 'textbox-alt',
    '/layout': 'layout-alt',
    '/list': 'list-alt',
    '/notification': 'notification-alt',
  };

  // Dynamically get all pages except the 'Home' page
  const componentLinks = computed(() => {
    return router.getRoutes()
      .filter(r => r.path !== '/' && r.path !== '/playground' && r.path !== '/about' && r.path !== '/version-updates')
      .map(r => ({
        name: r.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        path: r.path,
        icon: routeIcons[r.path] || 'question-alt'
      }));
  });

  // Manually prepend the 'Home' page as the first item on the sidebar and set to the default page
  const sidebarLinks = computed(() => [
    { name: 'Home', path: '/', icon: routeIcons['/'] || 'home' },
    { name: 'About', path: '/about', icon: routeIcons['/about'] || 'about' },
    { name: `What's New`, path: '/version-updates', icon: routeIcons['/version-updates'] || 'version-updates' },
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
          :class="{ active: route.path === link.path }"
          :title="link.name">
          <span class="nav-link--item">
            <span><NuedIcon :name="link.icon" size="medium" /></span>
            <span>{{ link.name }}</span>
          </span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  aside {
    background: $darkgrey-1;
    width: 60px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 62px;
    transition: width .3s ease;
    overflow-x: hidden;
    overflow-y: auto;

    ul {
      flex-grow: 1;
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
          padding: 1.25rem;
          text-decoration: none;

          &.active {
            background: $darkgrey-2;
            color: $primary;
          }

          .nav-link--item {
            display: inline-flex;
            gap: 1rem;
            align-items: center;
          }

          @media screen and (min-width: 768px) {
            padding: 1.5rem 3rem;
          }
        }
      }
    }

    @media screen and (min-width: 768px) {
      width: 250px;
    }
  }
</style>