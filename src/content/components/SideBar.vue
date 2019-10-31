<template>
    <div class="">
        <div class="toc-sidebar-btn-right" @click="openToc" v-if="!value&&place==='right'">
            <svg class="icon" aria-hidden="true" style="position: absolute; top: 48%;width: 3em; height: 3em">
              <use xlink:href="#icon-zuojiantou1"></use>
            </svg>
        </div>
        <div class="toc-sidebar-btn-left" @click="openToc" v-if="!value&&place==='left'">
            <svg class="icon" aria-hidden="true" style="position: absolute; top: 48%;width: 3em; height: 3em">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
        </div>
        <Drawer v-model="value" :draggable="true" :mask="false" :scrollable="true" :closable="false" :placement="place">
           <div class="toc-header"></div>
           <div style="margin: 20px 0 0 50px">
                <ButtonGroup>
                    <Tooltip trigger="hover" content="左右切换" placement="top" theme="light">
                        <Button @click="changePos">
                            <svg class="icon" aria-hidden="true" style=" width: 1.8em; height: 1.8em">
                              <use xlink:href="#icon-Hdonghua-zuoyoufanzhuan"></use>
                            </svg>
                        </Button>
                    </Tooltip>
                    <Tooltip trigger="hover" content="提issue" placement="top" theme="light">
                        <Button @click="issue">
                            <svg class="icon" aria-hidden="true" style=" width: 1.5em; height: 1.5em">
                              <use xlink:href="#icon-GitHub"></use>
                            </svg>
                        </Button>
                    </Tooltip>
                    <Tooltip trigger="hover" content="关闭" placement="top" theme="light">
                        <Button @click="closeToc">
                            <svg class="icon" aria-hidden="true" style=" width: 1.5em; height: 1.5em">
                              <use xlink:href="#icon-tuding"></use>
                            </svg>
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            </div>
            <div class="toc-content-tree" style="overflow-x: auto; height: 100%">
               <Tree :data="tree" @on-select-change="navigation"></Tree>
            </div>

            <template slot="trigger">
                <svg v-if="place==='left'" class="icon" aria-hidden="true" style="position: absolute; top: 48%; margin-left: -20px; width: 3em; height: 3em">
                  <use xlink:href="#icon-youjiantou"></use>
                </svg>
                <svg v-if="place==='right'" class="icon" aria-hidden="true" style="position: absolute; top: 48%; margin-left: -20px; width: 3em; height: 3em">
                  <use xlink:href="#icon-zuojiantou1"></use>
                </svg>
            </template>

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
                place: "right"
            }
        },
        methods: {
            openToc(){
              this.value = true
            },
            closeToc(){
              this.value = false
            },
            issue(){
                window.open("https://github.com/yangsoon/github-markdown-toc-sidebar/issues", '_blank')
            },
            changePos(){
                if(this.place==="right") {
                    this.place="left"
                } else {
                   this.place="right"
                }
            },
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
    .icon {
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    .toc-sidebar-btn-right {
        position: fixed;
        right: 18px;
        top: 48%;
        height: 35px;
        width: 35px;
        z-index: 999;
        cursor: pointer;
        border: none;
    }
    .toc-sidebar-btn-left {
        position: fixed;
        left: 18px;
        top: 48%;
        height: 35px;
        width: 35px;
        z-index: 999;
        cursor: pointer;
        border: none;
    }
    ::-webkit-scrollbar {
        background-color: white;
        width: 5px;
        height: 5px;
        background-clip: padding-box;
    }

    /*滚动条两端方向按钮*/
    ::-webkit-scrollbar-button {
        background-color: #bcbcbc;
    }

    /*滚动条中间滑动部分*/
    ::-webkit-scrollbar-thumb {
        background-color: #bcbcbc;
        border-radius: 5px;
    }

    /*滚动条右下角区域*/
    ::-webkit-scrollbar-corner {
        background-color: #bcbcbc;
    }

</style>