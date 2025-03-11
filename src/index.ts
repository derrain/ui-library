import type { App } from "vue";
import Alert from "./components/nued/Alert.vue";
import Button from "./components/nued/Button.vue";
import Input from "./components/nued/Input.vue";

export { Button, Input };

export default {
  install: (app: App) => {
    app.component('Alert', Alert);
    app.component('Button', Button);
    app.component('Input', Input);
  }
};