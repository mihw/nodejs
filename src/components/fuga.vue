<template>
<div>
    <component v-bind:is="item" v-for=" item in list" :key="item"></component>
    <button v-on:click="addWindow('w1')">add1</button>
    <button v-on:click="addWindow('w2')">add2</button>
    <button v-on:click="addWindow('w3')">add3</button>
    <button v-on:click="addWindow('w4')">add4</button>
    <button v-on:click="addWindow('w5')">add5</button>
    <button v-on:click="addWindow('w6')">add6</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import window1 from "./window1.vue";
import window2 from "./window2.vue";
import window3 from "./window3.vue";
import window4 from "./window4.vue";
import window5 from "./window5.vue";
import window6 from "./window6.vue";

export default Vue.extend({
  components: {
    w1: window1,
    w2: window2,
    w3: window3,
    w4: window4,
    w5: window5,
    w6: window6
  },

  data() {
    return {
      list: []
    };
  },
  methods: {
    addWindow(title: string) {
      this.list.push(title);
    }
  }
})
</script>



<style>
</style>