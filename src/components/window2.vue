<template>
<div>
    

        <!-- Window 2 -->

        <wnd-component caption="Window2"

                       :visible.sync="isVisibleWindow"

                       :initial-position="[160, 160]"

                       @require-inner-item="windowRequireInnerItem"

                       ></wnd-component>

        <div ref="windowInner" class="window-inner">
            <img src="../assets/logo.png" alt="neko">

        </div>



</div>
</template>

<script>
import store from "../logic/store.js";

import wndComponent from "./base.vue";

export default {
  components: {
    wndComponent
  },

  data: function() {
    return {
      isVisibleWindow: true
    };
  },

  store,

  methods: {
    windowRequireInnerItem: function(callback) {
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
  color: white;
}

.window-inner img {
  display: block;

  width: 300px;

  height: 300px;
}
</style>