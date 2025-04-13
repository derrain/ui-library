import type { App } from "vue";

const components = import.meta.glob('./components/nued/Nued*.vue', { eager: true });

const NuedUI = {
  install(app: App) {
    for (const path in components) {
      const component = (components[path] as any).default;

      if (component?.name && component.name.startsWith('Nued')) {
        app.component(component.name, component);
      }
    }
  }
};

export * from "./components";