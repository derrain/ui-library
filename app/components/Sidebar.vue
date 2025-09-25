<script setup>
  import { computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import NuedIcon from '~~/src/components/nued/NuedIcon.vue';
  import { setLastNavEl } from '~~/src/composables/useNavFocus';

  const router = useRouter();
  const route = useRoute();

  const routeIcons = {
    '/': 'home-alt',
    '/about': 'info-alt',
    '/card': 'card',
    '/datepicker': 'calendar-alt',
    '/dropdown': 'dropdown-alt',
    '/version-updates': 'history',
    '/accordion': 'accordion',
    '/alert': 'alarm-alt',
    '/button': 'cursor-alt',
    '/carousel': 'carousel-alt',
    '/icon': 'star-alt',
    '/input': 'textbox-alt',
    '/checkbox': 'checkbox-alt',
    '/layout': 'layout-alt',
    '/list': 'list-alt',
    '/notification': 'notification-alt',
    '/pagination': 'pagination',
    '/progress-bar': 'spinner',
    '/radio-button': 'radio-alt',
    '/switch': 'switch-alt',
    '/table': 'table-alt',
    '/textarea': 'textarea',
    '/timepicker': 'clock-alt',
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

  function remember(e) {
    const tgt = (e && e.currentTarget && e.currentTarget.nodeType === 1) ?
      e.currentTarget :
      (e?.target && e.target.closest) ?
        e.target.closest('#side-nav a, [role="menuitem"]') :
        null;
    
    if (tgt)
      setLastNavEl(tgt);
  }
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
          :title="link.name"
          @focus="remember"
          @click="remember"
          @keydown.enter="remember"
          role="menuitem">
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
    width: 85px;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 60px;
    transition: width .3s ease;

    ul {
      flex-grow: 1;
      margin: 0;
      padding: 0;
      list-style: none;
      overflow-x: hidden;
      overflow-y: auto;

      li {
        display: block;

        a {
          color: $white;
          font-size: 1.2rem;
          font-weight: 400;
          display: block;
          padding: 1.25rem 1px;
          text-decoration: none;

          &.active {
            background: $darkgrey-2;
            color: $primary;
          }

          .nav-link--item {
            font-size: .75rem;
            display: grid;
            align-items: center;
            text-align: center;

            @media screen and (min-width: 768px) {
              font-size: 1.195rem;
              display: inline-flex;
              gap: 1rem;
            }
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