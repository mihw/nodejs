<template>
<div>
    
        <!-- Window 3 -->

        <wnd-component caption="Window6"

                       :visible.sync="isVisibleWindow"

                       @require-inner-item="windowRequireInnerItem"

                       :initial-position="[30, 30]"

                       ></wnd-component>

        <div ref="windowInner" class="window-inner">
            <helloworld/>
                    </div>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import wndComponent from "./window.vue"
import helloworld from "./HelloWorld.vue"

export default Vue.extend({
  components: {
    wndComponent,
    helloworld
  },
  data() {
    return {
      isVisibleWindow: true
    };
  },

  methods: {
    windowRequireInnerItem(callback: (el: HTMLElement) => void) {
      callback(this.$refs.windowInner as HTMLElement);
    }
  }
})
</script>


<style scoped>
.window-inner {
  color: white;
}
</style>