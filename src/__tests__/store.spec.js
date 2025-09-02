import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Vuex Store', () => {
  let store

  beforeEach(() => {
    // Create a fresh store for each test
    store = new Vuex.Store({
      state: {
        wndStatuses: {},
        wndCount: 0,
        maxWndZIndex: 0
      },
      mutations: {
        setWndStatuses: (state, payload) => {
          if (!state.wndStatuses[payload.wndID]) {
            Vue.set(state.wndStatuses, payload.wndID, {
              zIndex: state.wndCount
            })
            state.maxWndZIndex = state.wndCount
            state.wndCount = state.wndCount + 1
          }
        },
        moveWndToTop: (state, payload) => {
          if (!state.wndStatuses[payload.wndID]) return
          
          let oldZIndex = state.wndStatuses[payload.wndID].zIndex
          state.wndStatuses[payload.wndID].zIndex = state.maxWndZIndex
          
          for (let key in state.wndStatuses) {
            if ((state.wndStatuses[key].zIndex > oldZIndex) && (key !== payload.wndID)) {
              state.wndStatuses[key].zIndex -= 1
            }
          }
        }
      },
      actions: {
        setWndStatuses (context, payload) {
          context.commit('setWndStatuses', payload)
        },
        moveWndToTop (context, payload) {
          context.commit('moveWndToTop', payload)
        }
      }
    })
  })

  describe('Initial State', () => {
    test('should have correct initial state', () => {
      expect(store.state.wndStatuses).toEqual({})
      expect(store.state.wndCount).toBe(0)
      expect(store.state.maxWndZIndex).toBe(0)
    })
  })

  describe('Mutations', () => {
    describe('setWndStatuses', () => {
      test('should add new window status', () => {
        store.commit('setWndStatuses', { wndID: 'window1' })
        
        expect(store.state.wndStatuses.window1).toBeDefined()
        expect(store.state.wndStatuses.window1.zIndex).toBe(0)
        expect(store.state.maxWndZIndex).toBe(0)
        expect(store.state.wndCount).toBe(1)
      })

      test('should not duplicate window status', () => {
        store.commit('setWndStatuses', { wndID: 'window1' })
        const firstZIndex = store.state.wndStatuses.window1.zIndex
        const firstCount = store.state.wndCount
        
        store.commit('setWndStatuses', { wndID: 'window1' })
        
        expect(store.state.wndCount).toBe(firstCount)
        expect(store.state.wndStatuses.window1.zIndex).toBe(firstZIndex)
      })

      test('should increment window count for multiple windows', () => {
        store.commit('setWndStatuses', { wndID: 'window1' })
        expect(store.state.wndCount).toBe(1)
        expect(store.state.wndStatuses.window1.zIndex).toBe(0)
        
        store.commit('setWndStatuses', { wndID: 'window2' })
        expect(store.state.wndCount).toBe(2)
        expect(store.state.wndStatuses.window2.zIndex).toBe(1)
        
        store.commit('setWndStatuses', { wndID: 'window3' })
        expect(store.state.wndCount).toBe(3)
        expect(store.state.wndStatuses.window3.zIndex).toBe(2)
        expect(store.state.maxWndZIndex).toBe(2)
      })
    })

    describe('moveWndToTop', () => {
      beforeEach(() => {
        store.commit('setWndStatuses', { wndID: 'window1' })
        store.commit('setWndStatuses', { wndID: 'window2' })
        store.commit('setWndStatuses', { wndID: 'window3' })
      })

      test('should move window to top', () => {
        // Initially window3 has highest zIndex (2)
        expect(store.state.wndStatuses.window3.zIndex).toBe(2)
        
        // Move window1 to top
        store.commit('moveWndToTop', { wndID: 'window1' })
        
        // window1 should now have the maxWndZIndex
        expect(store.state.wndStatuses.window1.zIndex).toBe(2)
        // Other windows should have lower zIndex
        expect(store.state.wndStatuses.window2.zIndex).toBeLessThanOrEqual(1)
        expect(store.state.wndStatuses.window3.zIndex).toBeLessThanOrEqual(1)
      })

      test('should not change if window does not exist', () => {
        const beforeState = JSON.parse(JSON.stringify(store.state))
        store.commit('moveWndToTop', { wndID: 'nonexistent' })
        
        expect(store.state.wndStatuses).toEqual(beforeState.wndStatuses)
      })
    })
  })

  describe('Actions', () => {
    test('setWndStatuses action should work correctly', async () => {
      await store.dispatch('setWndStatuses', { wndID: 'window1' })
      
      expect(store.state.wndStatuses.window1).toBeDefined()
      expect(store.state.wndCount).toBe(1)
    })

    test('moveWndToTop action should work correctly', async () => {
      await store.dispatch('setWndStatuses', { wndID: 'window1' })
      await store.dispatch('setWndStatuses', { wndID: 'window2' })
      await store.dispatch('moveWndToTop', { wndID: 'window1' })
      
      expect(store.state.wndStatuses.window1.zIndex).toBe(store.state.maxWndZIndex)
    })
  })
})