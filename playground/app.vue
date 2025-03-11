<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
  @use '~/assets/colors' as *;

  html,
  body {
    font-family: 'Manjari', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 100;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: $black;

    section {
      padding-bottom: 1rem;
    }

    .page-header {
      display: inline-block;
      position: relative;
      padding-bottom: 5px;

      &::before {
        content: "";
        position: absolute;
        width: 50%;
        bottom: 0;
        border-bottom: 2px solid $primary;
      }
    }

    p {
      font-size: 1.2rem;
      font-weight: 400;
      margin-top: 0;
    }
  }
</style>