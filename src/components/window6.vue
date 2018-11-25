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


<script>
import wndComponent from "./window.vue";
import helloworld from "./HelloWorld.vue";

export default {
  components: {
    wndComponent,
    helloworld
  },
  data: function() {
    return {
      isVisibleWindow: true
    };
  },

  methods: {
    windowRequireInnerItem: function(callback) {
      callback(this.$refs.windowInner);
    }
  }
};
</script>


<style scoped>
.window-inner {
  color: white;
}
</style>