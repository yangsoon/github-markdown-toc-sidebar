import Vue from "vue/dist/vue.esm.js";
import 'view-design/dist/styles/iview.css';
import SideBar from "./components/SideBar"

import {
    Button,
    Drawer,
    Tree,
    BackTop
} from "view-design";

Vue.component("Button", Button);
Vue.component("Drawer", Drawer);
Vue.component("Tree", Tree);
Vue.component("BackTop", BackTop);
Vue.component('side-bar', SideBar);

// let githubHeader = document.getElementsByClassName("Header")[0];
// githubHeader.style['padding-right'] = "300px";
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
    // mainDom.style['padding-right'] = "260px";
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










