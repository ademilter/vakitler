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
    // global store
    countries: [],
    cities: [],
    towns: [],
    times: [],
    // user store
    countryId: -1,
    cityId: -1,
    townId: -1,
    // ramadan
    ramadan: {
      start: moment('5-6-2019', 'M-D-YYYY'),
      end: moment('6-3-2019', 'M-D-YYYY')
    }
  },
  getters,
  actions,
  mutations
})
