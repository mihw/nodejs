import Vue from 'vue'
import { Store } from 'vuex'
import { StoreState } from './types'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<StoreState>
  }
}