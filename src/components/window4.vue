<template>
<div>
    
        <!-- Window 3 -->

        <wnd-component caption="Window4"

                       :visible.sync="isVisibleWindow"

                       @require-inner-item="windowRequireInnerItem"

                       @button-clicked="clear"
                       :initial-position="[30, 30]"

                       :select-buttons="[{caption: 'yes'}, {caption: 'no'}]"

                       :dialogMode="true"

                       :initial-width="300"
                       :initial-height="300"
                       ></wnd-component>

        <div ref="windowInner" class="window-inner">
            yes no button no test desu.
                    </div>
</div>
</template>


<script lang="ts">
import wndComponent from "./window.vue";
import Vue from 'vue'
import script from "../logic/script"

export default Vue.extend({
  mixins: [script],
  components: {
    wndComponent
  },
  data() {
    return {
      isVisibleWindow: true
    };
  },

  methods: {
    windowRequireInnerItem(callback: (el: HTMLElement) => void) {
      callback(this.$refs.windowInner as HTMLElement);
    },

    buttonClicked(item: { caption: string }) {
      alert("this is a test ${item.caption} {{item.caption}}");
    }
  }
})
</script>


<style scoped>
.window-inner {
  color: white;
}
</style>