import Vue from "vue/dist/vue.esm.js";
import 'view-design/dist/styles/iview.css';
import SideBar from "./components/SideBar"

import {Button, Drawer, Tree} from "view-design";

Vue.component("Button", Button);
Vue.component("Drawer", Drawer);
Vue.component("Tree", Tree);
Vue.component('side-bar', SideBar);

(function insertViewIcons() {
    let ViewIcons = document.createElement('style');
    ViewIcons.type = 'text/css';
    ViewIcons.textContent = `
        @font-face {
            font-family: "Ionicons";
            src: url('${ window.chrome.extension.getURL("fonts/ionicons.woff2")}') format('woff'),
            url('${ window.chrome.extension.getURL("fonts/ionicons.woff")}') format('woff'),
            url('${ window.chrome.extension.getURL("fonts/ionicons.ttf")}') format('truetype');
        }
    `;
    document.head.appendChild(ViewIcons);
})();

function insertSideBar() {
    let sideBar = document.createElement('div');
    sideBar.id = "toc-side-bar";
    sideBar.innerHTML = '<side-bar></side-bar>';
    let mainDom = document.getElementById('js-repo-pjax-container');
    mainDom.appendChild(sideBar);
    new Vue({
       el: "#toc-side-bar",
    });
}

document.body.onload = insertSideBar;



