import type { App } from "vue";
import Button from "./components/nued/Button.vue";
import Input from "./components/nued/Input.vue";
import Row from "./components/nued/Row.vue";

export { Button, Input, Row };

export default {
  install: (app: App) => {
    app.component('Button', Button);
    app.component('Input', Input);
    app.component('Row', Row);
  }
};