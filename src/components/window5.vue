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
    addWindow(title: string) {},

    windowRequireInnerItem(callback: (el: HTMLElement) => void) {
      //�E�C���h�E1�ɓ��ׂ��v�f��ݒ�

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
  width: 200px;

  height: 100px;

  color: white;
}
</style>