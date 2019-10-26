import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import {
  Card
} from 'element-ui';

Vue.use(Card);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
