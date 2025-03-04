import type { App } from "vue";
import Button from "./components/Button.vue";
import Input from "./components/Input.vue";

export { Button, Input };

export default {
  install: (app: App) => {
    app.component('Button', Button);
    app.component('Input', Input);
  }
};