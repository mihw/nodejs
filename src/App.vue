<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p><input v-model="message"></p>
    <p>{{message}}</p>  
    <input type="password" name="password" id="password" required><br>
    <button @click="clear()">clear</button>
    <Form name='Default User Form' help='account/modify-help.xml'> 
       <Display class='EditForm'> 
            <Property name='titleWidth' value='120'/>
                 <Property name='adjacentTitleWidth' value='60'/>
                    </Display> 
    </Form>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "App",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    clear() {
      this.message = "";
    }
  }
})
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
