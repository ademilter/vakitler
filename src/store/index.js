import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import moment from 'moment'

let secondToArray = (second) => {
  let pad = (x) => {
    return x < 10 ? '0' + x : x
  }
  return [
    pad(Math.floor(second / 3600)),
    pad(Math.floor(second % 3600 / 60)),
    pad(Math.floor(second % 60))
  ]
}

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
    periodTotalTime: '',
    Ramadan: {
      counter: '',
      status: '',
      totalTime: '',
      start: moment('5-27-2017', 'MM-DD-YYYY'),
      end: moment('6-24-2017', 'MM-DD-YYYY')
    }
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
      return secondToArray(state.secCounter)
    },
    secCounter (state) {
      return state.secCounter
    },
    periodTotalTime (state) {
      return state.periodTotalTime
    },
    percentCounter (state) {
      return state.secCounter * 100 / state.periodTotalTime
    },
    ramadanStatus (state) {
      return state.Ramadan.status
    },
    ramadanTotalTime (state) {
      return state.Ramadan.totalTime
    },
    ramadanCounter (state) {
      return secondToArray(state.Ramadan.totalTime)
    }
  }
})
