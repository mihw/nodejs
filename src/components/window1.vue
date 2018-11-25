<template>
<div>

        <!-- Window 1 -->

        <wnd-component caption="Window1"

                       :visible.sync="isVisibleWindow"

                       @require-inner-item="windowRequireInnerItem"

                       ></wnd-component>

        <div ref="windowInner" class="window-inner">

            Hello world!!
</div>
        </div>
</template>




<script>

import store from "../logic/store.js"

import wndComponent from "./base.vue"




export default {
    
    components: {
        wndComponent
    },
    data: function () {

        return {

            isVisibleWindow: true

        }

    },

    store,

    methods: {
        addWindow: function(title){

        },

        windowRequireInnerItem: function(callback){

            //ウインドウ1に内包すべき要素を設定

            callback(this.$refs.windowInner);

        },


        buttonClicked: function(item) {

            //押されたボタンを表示する

            alert(`押されたボタンは「${item.caption}」`);

    }
  }
};
</script>

<style scoped>
.window-inner {
  width: 200px;

  height: 100px;

  color: white;
}
</style>