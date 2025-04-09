import { defineNuxtPlugin } from "#app";
import { useIconConfig } from "~~/src/composables/useIconConfig";

export default defineNuxtPlugin(() => {
  useIconConfig();
});