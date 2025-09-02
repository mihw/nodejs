import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        wndStatuses: {},
        wndCount: 0,
        maxWndZIndex: 0
    },
    mutations: {
        setWndStatuses: (state, payload) => {
            const wndID = String(payload.wndID);
            if (!state.wndStatuses[wndID]) {
                Vue.set(state.wndStatuses, wndID, {
                    zIndex: state.wndCount
                });
                state.maxWndZIndex = state.wndCount;
                state.wndCount = state.wndCount + 1;
            }
        },
        moveWndToTop: (state, payload) => {
            const wndID = String(payload.wndID);
            const oldZIndex = state.wndStatuses[wndID].zIndex;
            state.wndStatuses[wndID].zIndex = state.maxWndZIndex;
            for (const key in state.wndStatuses) {
                if ((state.wndStatuses[key].zIndex > oldZIndex) && (key !== wndID)) {
                    state.wndStatuses[key].zIndex -= 1;
                }
            }
        }
    },
    actions: {
        setWndStatuses(context, payload) {
            context.commit('setWndStatuses', payload);
        },
        moveWndToTop(context, payload) {
            context.commit('moveWndToTop', payload);
        }
    }
});
//# sourceMappingURL=store.js.map