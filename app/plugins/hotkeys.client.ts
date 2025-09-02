import { defineNuxtPlugin } from "nuxt/app";

export default defineNuxtPlugin(() => {
  const focus = (sel: string) => {
    document.querySelector<HTMLElement>(sel)?.focus();
  }

  window.addEventListener('keydown', (e) => {
    if (!e.ctrlKey || !e.altKey)
      return;

    const k = e.key.toLowerCase();

    if (k === 'm') {
      e.preventDefault();
      focus('#main');
    }

    if (k === 'n') {
      e.preventDefault();
      focus('#side-nav');
    }
  });
});