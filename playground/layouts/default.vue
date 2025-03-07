<template>
  <div class="main-wrapper">
    <Navbar />
    <main>
      <Sidebar />
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  .main-wrapper {
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;

    main {
      display: grid;
      grid-template-columns: 250px 1fr;

      .container {
        background: $darkgrey-2;
        color: $white;
        padding: 1.5rem 2rem;
      }
    }
  }
</style>