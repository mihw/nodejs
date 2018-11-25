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


<script>
import wndComponent from "./window.vue";
import script from "../logic/script.js";

export default {
  mixins: [script],
  components: {
    wndComponent
  },
  data: function() {
    return {
      isVisibleWindow: true
    };
  },

  methods: {
    windowRequireInnerItem: function(callback) {
      callback(this.$refs.windowInner);
    },

    buttonClicked: function(item) {
      alert("this is a test ${item.caption} {{item.caption}}");
    }
  }
};
</script>


<style scoped>
.window-inner {
  color: white;
}
</style>