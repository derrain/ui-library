<template>
  <header>
    <nav>
      <router-link to="/" class="navbar-brand">
        <h1>
          <span class="special-letter">N</span>uxt <span class="special-letter">U</span>ser <span class="special-letter">E</span>xperience <span class="special-letter">D</span>esign
        </h1>
      </router-link>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  header {
    background: $black;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    position: sticky;
    top: 0;
    padding: 1rem 1rem .5rem;
    box-sizing: border-box;
    z-index: 10;

    nav {
      width: fit-content;

      .navbar-brand {
        color: $white;
        text-decoration: none;

        h1 {
          font-size: 1.25rem;
          font-weight: 100;
          margin: 0;
          padding: 0;

          span {
            &.special-letter {
              color: $primary;
              font-size: 2rem;
              font-weight: 500;
            }
          }

          @media screen and (min-width: 768px) {
            font-size: 2rem;
          }
        }
      }
    }
  }
</style>
