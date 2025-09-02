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

<script lang="ts">
import Vue from 'vue'
import store from "../logic/store"

import wndComponent from "./base.vue";

export default Vue.extend({
  components: {
    wndComponent
  },

  data() {
    return {
      isVisibleWindow: true
    };
  },

  store,

  methods: {
    windowRequireInnerItem(callback: (el: HTMLElement) => void) {
      //�E�C���h�E1�ɓ���ׂ��v�f��ݒ�

      callback(this.$refs.windowInner as HTMLElement);
    },

    buttonClicked(item: { caption: string }) {
      //�����ꂽ�{�^����\������

      alert(`�����ꂽ�{�^���́u${item.caption}�v`);
    }
  }
})
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