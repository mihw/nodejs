import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Main from '../components/main.vue';
import Wnd from '../components/wnd.vue';
import Fuga from '../components/fuga.vue';
import window1 from '../components/window1.vue';
Vue.use(Router);
const routes = [
    {
        path: '/helloworld',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/main',
        name: 'main',
        component: Main
    },
    {
        path: '/wnd',
        name: 'wnd',
        component: Wnd
    },
    {
        path: '/',
        name: 'fuga',
        component: Fuga
    },
    {
        path: '/fuga',
        name: 'fuga',
        component: Fuga
    },
    {
        path: '/window1',
        name: 'window1',
        component: window1
    }
];
export default new Router({
    routes
});
//# sourceMappingURL=index.js.map