import { defineNuxtPlugin } from "nuxt/app";
import { nextTick } from "vue";
import { setLastNavEl } from "~~/src/composables/useNavFocus";

export default defineNuxtPlugin(({ hook }) => {
  hook('page:start', () => {
    const el = document.activeElement as HTMLElement | null;

    if (el && el.closest('#side-nav'))
      setLastNavEl(el);
  });

  hook('page:finish', async () => {
    await nextTick();

    document.getElementById('main')?.focus();

    const live = document.getElementById('a11y-live');

    if (live) {
      live.textContent = 'Main content load. Press Control Alt N to return to navigation.'
    }
  });
});