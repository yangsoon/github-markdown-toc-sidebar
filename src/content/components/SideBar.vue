<template>
    <div class="">
        <Drawer v-model="value" :draggable="true" :mask="false" :scrollable="true">
            <div class="toc-header">

            </div>
            <div class="toc-content-tree">
               <Tree :data="tree" @on-select-change="navigation"></Tree>
            </div>
        </Drawer>
    </div>
</template>

<script>
    export default {
        name: "SideBar",
        props: {
          tree: Array
        },
        data () {
            return {
                value: true,
            }
        },
        methods: {
            navigation(node){
                if(node.length > 0) {
                    let href = node[0].href.split("#")[1];
                    window.location.href = "#" + href
                }
            }
        }
    }
</script>

<style>
    .toc-header {
        height: 64px;
        float: start;
        background: rgb(55, 62, 67);
    }
    .toc-back-top {
        position: absolute;
        z-index: 999;
    }
    .ivu-drawer-body {
        width: 100%;
        height: calc(100% - 51px);
        font-size: 14px;
        line-height: 1.5;
        overflow-wrap: break-word;
        position: absolute;
        padding: 0px;
        overflow: auto;
    }
    .toc-content-tree {
        padding: 10px;
    }
</style>