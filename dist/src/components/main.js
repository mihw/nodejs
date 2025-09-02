import Vue from 'vue';
import Vuex from 'vuex';
import appOptions from './main.vue';
Vue.use(Vuex);
window.addEventListener('load', () => new Vue(appOptions).$mount('#app-entrypoint'), false);
//# sourceMappingURL=main.js.map