import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import moment from 'moment'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    now: moment(),
    // global store
    countries: [],
    cities: [],
    towns: [],
    times: [],
    // user store
    countryId: -1,
    cityId: -1,
    townId: -1,
    lang: 'tr'
  },
  getters,
  actions,
  mutations
})
