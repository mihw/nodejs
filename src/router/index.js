import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/main'
import Wnd from '@/components/wnd'
import Fuga from '@/components/fuga'
import window1 from '@/components/window1'

Vue.use(Router)

export default new Router({
  routes: [
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
  ]
})
