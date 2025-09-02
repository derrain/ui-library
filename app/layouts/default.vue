<template>
  <div class="main-wrapper">
    <Navbar />

    <div class="content">
      <Sidebar
        id="side-nav"
        class="sidebar"
        tabindex="-1" />

        <main
          id="main"
          class="container"
          tabindex="-1">
          <BackToNav nav="#side-nav" />

          <slot />
        </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BackToNav from '../components/BackToNav.vue';
</script>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  .main-wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .content {
      display: flex;
      flex: 1;
      position: relative;

      :deep(.sidebar) {
        width: 85px;
        height: calc(100vh - 59.5px);
        position: fixed;
        inset-block-start: 0;
        inset-inline-start: 0;

        @media screen and (min-width: 768px) {
          width: 250px;
          height: calc(100vh - 60px);
        }
      }

      .container {
        background: $darkgrey-2;
        color: $white;
        min-width: 0;
        flex: 1 1 auto;
        position: relative;
        margin-left: 85px;
        padding: 1.5rem 2rem;

        @media screen and (min-width: 768px) {
          margin-left: 250px;
        }
      }
    }
  }
</style>