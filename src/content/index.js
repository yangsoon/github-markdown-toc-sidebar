import Vue from "vue/dist/vue.esm.js";
import 'view-design/dist/styles/iview.css';
import SideBar from "./components/SideBar"
import "./iconfont"

import {
    Button,
    Drawer,
    Tree,
    Icon,
    Tooltip,
    ButtonGroup
} from "view-design";

Vue.component("Button", Button);
Vue.component("Drawer", Drawer);
Vue.component("Tree", Tree);
Vue.component("Tooltip", Tooltip);
Vue.component("Icon", Icon);
Vue.component("ButtonGroup", ButtonGroup);
Vue.component('side-bar', SideBar);

function extractHeadings() {
    let headList = [];
    for(let i = 1; i <=6; i++) {
        headList.push("h" + i + ">" + "a.anchor");
    }
    let headCssSelectors = headList.join();
    return document.querySelectorAll(headCssSelectors);
}

function buildTOCTree(heads) {
    let tree = {
        title:"github-md-toc",
        expand: true,
        children: [],
        parent: null,
        tag: "A",
        href: "",
    };
    let pre = tree;
    for(let i=0; i < heads.length; i++) {
        let tagName = heads[i].parentNode.tagName;
        if(tagName <= pre.tag) {
            while(tagName <= pre.tag) {
                pre = pre.parent;
            }
        }
        pre.children.push({
            title: heads[i].parentNode.textContent,
            expand: true,
            children: [],
            parent: pre,
            tag: tagName,
            href: heads[i].href
        });
        pre = pre.children[pre.children.length - 1];
    }
    return tree;
}

function getComponentData() {
    let heads = extractHeadings();
    let data = buildTOCTree(heads);
    return data
}

function insertSideBar() {
    let sideBar = document.createElement('div');
    sideBar.id = "toc-side-bar";
    sideBar.innerHTML = '<side-bar :tree="tree"></side-bar>';
    let mainDom = document.getElementsByTagName('main')[0];
    mainDom.appendChild(sideBar);
    let tree = getComponentData();
    new Vue({
       el: "#toc-side-bar",
       data: {
           tree: tree.children
       }
    });
}

let markdown = document.getElementsByTagName("article")[0] || document.getElementById("wiki-body");

if (markdown) {
    (function insertViewIcons() {
        let ViewIcons = document.createElement('style');
        ViewIcons.type = 'text/css';
        ViewIcons.textContent = `
            @font-face {
                font-family: "Ionicons";
                src: url('${ window.chrome.extension.getURL("fonts/ionicons.woff2")}') format('woff2'),
                url('${ window.chrome.extension.getURL("fonts/ionicons.woff")}') format('woff'),
                url('${ window.chrome.extension.getURL("fonts/ionicons.ttf")}') format('truetype');
            }
        `;
        document.head.appendChild(ViewIcons);
    })();
    document.body.onload = insertSideBar;
}










