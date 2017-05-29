import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  actions,
  mutations,
  state: {
    il: '',
    ilce: '',
    zaman: {},
    vakit: '',
    vakitler: {}
  },
  getters: {
    il (state) {
      return state.il
    },
    ilce (state) {
      return state.ilce
    },
    zaman (state) {
      return state.zaman
    },
    vakit (state) {
      return state.vakit
    },
    vakitler (state) {
      return state.vakitler
    }
  }
})
