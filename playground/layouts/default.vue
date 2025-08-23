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
    display: flex;
    flex-direction: column;

    main {
      display: flex;
      flex: 1;

      .container {
        background: $darkgrey-2;
        color: $white;
        min-width: 0;
        flex-grow: 1;
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