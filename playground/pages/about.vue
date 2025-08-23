<template>
  <section>
    <h2 class="page-header">About the Author</h2>
    <div class="author">
      <img src="../public/derrain.webp" alt="Derrain De Silva" class="author-image" />

      <h3>The idea</h3>
      <p>Building a custom frontend UI component library was an idea that struck me while working at 99x Technologies. However, my initial idea even before working at 99x was to build a UI framework similar to Bootstrap. The idea of creating actual components just made sense after I witnessed the increase in the efficiency and productivity of not having to write every single html tag.</p>
      <h3>Young me</h3>
      <p>The creative side of tech was my passion since the age of 13, using the MSN web browser on an Intel Pentium 3 desktop computer running Windows 98 along with a dial-up connection. By the time I finished school and graduated from university, the cluttered and flashy designs of the old age were gone, replaced by subtle and minimalist UI.</p>
      <h3>NUED (newd)</h3>
      <p>NUED is pronounced the same as 'Vue' was meant to be pronounced, but with the letter 'd' at the end. NUED's inspiration came from a previous UI component library I helped maintain while working at 99x Technologies. The framework incorporated the word "Aurelia" as it was based on the AureliaJS framework, so I decided to include 'Nuxt' in a similar fashion.</p>
      <h3>Introduction</h3>
      <p>My name is Derrain De Silva and my game is UX Design with a tinge of Frontend Development. I was born and raised in the tiny island of Sri Lanka, although I currently reside in beautiful Aoteroa New Zealand. NUED is my way of showing gratitude towards the community that moulded me into the person I am today.</p>
      <p>To read more about this, check out my Medium article: <a href="https://medium.com/@derraindesilva/nued-5544d84e1f9c" target="_blank">Nued Medium Article</a>.</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  .author {
    max-width: 100%;
    float: left;

    .author-image {
      width: 150px;
      display: grid;
      gap: 1.5rem;
      position: relative;
      margin: 0 auto;
      margin-bottom: 2rem;
      border-radius: 50%;
      box-shadow: 0 0 15px 10px rgb($primary, .25);

      @media screen and (min-width: 991px) {
        width: 250px;
        margin-right: 2rem;
        float: left;
      }
    }

    h3 {
      font-size: 1.75rem;
      font-weight: 100;
    }

    a {
      color: $primary;
      text-decoration: none;
    }
  } 
</style>