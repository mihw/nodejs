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

<script lang="ts">
import Vue from 'vue'
import store from "../logic/store"

import wndComponent from "./base.vue";

import axios from "axios";
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
    clickYes() {
      axios({
        method: "GET",
        url: "http://localhost:3000/users",
        headers: { "Content-Type": "text/plain; charset=utf-8" },
        validateStatus: function(status: number) {
          return status > 0;
        }
      })
        .then(function(response: any) {
          console.log(response);
          alert("e1-" + response.data);
        })
        .catch(function(error: any) {
          console.log(error);
          alert("e2-" + error + " " + error.status + " " + error.code);
        });
    },
    clickNo() {
      alert("no");
      this.isVisibleWindow = false;
    },
    windowRequireInnerItem(callback: (el: HTMLElement) => void) {
      callback(this.$refs.windowInner as HTMLElement);
    },

    buttonClicked(item: { caption: string }) {
      alert("this is a test {{item.caption}}");
    }
  }
})
</script>



<style scoped>
.window-inner {
  color: white;
}
</style>