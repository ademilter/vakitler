import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  actions,
  mutations,
  state: {
    Periods: {},
    currentPeriod: '',
    nextPeriod: '',
    Counter: '',
    secCounter: '',
    periodTotalTime: ''
  },
  getters: {
    Periods (state) {
      return state.Periods
    },
    currentPeriod (state) {
      return state.currentPeriod
    },
    nextPeriod (state) {
      return state.nextPeriod
    },
    Counter (state) {
      // https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss?page=2&tab=votes#tab-top
      let pad = (input) => {
        return input < 10 ? '0' + input : input
      }
      return [
        pad(Math.floor(state.Counter / 3600)),
        pad(Math.floor(state.Counter % 3600 / 60)),
        pad(Math.floor(state.Counter % 60))
      ]
    },
    secCounter (state) {
      return state.secCounter
    },
    periodTotalTime (state) {
      return state.periodTotalTime
    }
  }
})
