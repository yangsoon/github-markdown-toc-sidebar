import Vue from "vue";
import AppComponent from "./App/App.vue";
import 'view-design/dist/styles/iview.css';

Vue.component("app-component", AppComponent);

import {
  Card,
  Button
} from 'view-design';

Vue.component('Card', Card);
Vue.component('Button', Button);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
