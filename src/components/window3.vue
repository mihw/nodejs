<template>
<div>
    
        <!-- Window 3 -->

        <wnd-component caption="Window3"

                       :visible.sync="isVisibleWindow"

                       @require-inner-item="windowRequireInnerItem"

                       @button-clicked="buttonClicked"

                       :initial-position="[30, 30]"

                       :select-buttons="[{caption: 'yes'}, {caption: 'no'}]"
                       ></wnd-component>

        <div ref="windowInner" class="window-inner">
          <div>
            yes no button no test desu.
          </div>
            <button @click="clickYes">yes</button>
            <button @click="clickNo">no</button>
                    </div>

</div>
</template>

<script>
import store from "../logic/store.js";

import wndComponent from "./base.vue";

import axios from "axios";
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
    clickYes: function() {
      axios({
        method: "GET",
        url: "http://localhost:3000/users",
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        validateStatus: function(status) {
          return status > 0;
        }
      })
        .then(function(response) {
          console.log(response);
          alert("e1-" + response.data);
        })
        .catch(function(error) {
          console.log(error);
          alert("e2-" + error + " " + error.status + " " + error.code);
        });
    },
    clickNo: function() {
      alert("no");
      this.isVisibleWindow = false;
    },
    windowRequireInnerItem: function(callback) {
      callback(this.$refs.windowInner);
    },

    buttonClicked: function(item) {
      alert("this is a test {{item.caption}}");
    }
  }
};
</script>



<style scoped>
.window-inner {
  color: white;
}
</style>