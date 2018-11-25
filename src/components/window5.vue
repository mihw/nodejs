<template>
<div>

        <!-- Window 5 -->

        <wnd-component caption="Window5"

                       :visible.sync="isVisibleWindow"

                       @require-inner-item="windowRequireInnerItem"

                       ></wnd-component>

        <div ref="windowInner" class="window-inner">

            Hello world!!
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
    addWindow: function(title) {},

    windowRequireInnerItem: function(callback) {
      //�E�C���h�E1�ɓ��ׂ��v�f��ݒ�

      callback(this.$refs.windowInner);
    },

    buttonClicked: function(item) {
      //�����ꂽ�{�^����\������

      alert(`�����ꂽ�{�^���́u${item.caption}�v`);
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