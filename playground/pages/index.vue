<script setup>
  import NuedIcon from '~~/src/components/nued/NuedIcon.vue';

  const pkgs = [
    {
      name: 'iconify/vue',
      value: 'npm install --save-dev @iconify/vue'
    },
    {
      name: 'sass-embedded',
      value: 'npm i sass-embedded'
    }
  ];

  const copyPkgName = (pkgName) => {
    navigator.clipboard.writeText(pkgName);
    copiedMessage.value = `"${pkgName}" copied!`;
    showCopiedMessage.value = true;
    setTimeout(() => {
      showCopiedMessage.value = false;
    }, 2000);
  }

  const handleKeyPress = (Event, pkgName) => {
    if (Event.key === 'Enter') {
      copyPkgName(pkgName);
    }
  };
</script>

<template>
  <section>
    <h2 class="page-header">Welcome to the NUED UI Component Library</h2>
    <p>NUED is a UI component library built on the Nuxt Framework. This is a simple UI library featuring basic components used in creating minimalist websites.</p>
    <p>Consider NUED to be the building blocks in the Nuxt world!</p>
  </section>
  
  <section>
    <div class="sub-title">
      <NuedIcon
        name="globe-alt"
        size="large"
        color="#429871" />
      <h3>Compatibility</h3>
    </div>
    <p>This library is compatible with NuxtJS 3.0 and after.</p>
  </section>

  <section>
    <div class="sub-title">
      <NuedIcon
        name="accessibility"
        size="large"
        color="#429871" />
      <h3>Web Accessibility</h3>
    </div>
    <p>The NUED UI component library follows WCAG 2.2 Level AA guidelines.</p>
  </section>

  <section class="dependencies">
    <h3>Dependencies</h3>
    <ul>
      <li
        v-for="pkg in pkgs"
        :key="pkgs[pkg]"
        :title="`Click to copy ${pkg.name}`"
        @click="copyPkgName(pkg.value)"
        @keypress="handleKeyPress($event, pkg.value)"
        tabindex="0">
        <code>{{ pkg.value }}</code>
      </li>
    </ul>
  </section>

  <section class="installation">
    <h3>How to install</h3>
    <ol>
      <li>
        Install the NUED library using
        <code
          title="Click to copy NUED"
          @click="copyPkgName('npm i nued')"
          @keypress="handleKeyPress($event, 'npm i nued')"
          tabindex="0">
          npm i nued-ui
        </code>
      </li>
      <li>Enjoy the power on NUED!</li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
  @use '~/assets/colors' as *;

  .sub-title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .dependencies,
  .installation {
    background: $darkgrey-1;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 8px;
  }

  .dependencies {
    ul {
      li {
        cursor: default;

        &:hover,
        &:focus-visible,
        &:active {
          color: $primary;
        }
      }
    }
  }

  .installation {
    ol {
      li {
        line-height: 1.5;

        code {
          cursor: default;

          &:hover,
          &:focus-visible,
          &:active {
            color: $primary;
          }
        }
      }
    }
  }
</style>