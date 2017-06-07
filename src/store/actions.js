import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
const API_URL = 'https://ezanvakti.herokuapp.com/'

export default {

  GET_COUNTRY ({ commit }) {
    axios.get(API_URL + 'ulkeler').then((res) => {
      if (res.status === 200) {
        commit('SET_COUNTRY', res.data)
      }
    })
  },

  GET_STATE ({ commit }) {
    axios.get(API_URL + 'sehirler?ulke=' + localStorage.getItem('countryId')).then((res) => {
      if (res.status === 200) {
        commit('SET_STATE', res.data)
      }
    })
  },

  GET_TOWN ({ commit }) {
    axios.get(API_URL + 'ilceler?sehir=' + localStorage.getItem('stateId')).then((res) => {
      if (res.status === 200) {
        commit('SET_TOWN', res.data)
      }
    })
  },

  GET_PERIOD ({ dispatch, commit, state }) {
    axios.get(API_URL + 'vakitler?ilce=' + localStorage.getItem('townId')).then((res) => {
      if (res.status === 200) {
        commit('SET_PERIODS', res.data)
        dispatch('FIND_PERIOD')
        commit('TOTAL_TIME')
        dispatch('CHECK_RAMADAN')

        setInterval(() => {
          commit('COUNTER')
          let counter = _.map(state.Counter, _.unary(parseInt))
          if (_.sum(counter) === 0) {
            dispatch('FIND_PERIOD')
          }
        }, 1000)
      }
    })
  },

  FIND_PERIOD ({ commit }) {
    commit('FIND_CURRENT_PERIOD')
    commit('FIND_NEXT_PERIOD')
  },

  CHECK_RAMADAN ({ commit, state }) {
    let IS_RAMADAN = moment(new Date()).isBetween(state.ramadan.start, state.ramadan.end, null, '[]')
    commit('SET_IS_RAMADAN', IS_RAMADAN)
    if (IS_RAMADAN) {
      setInterval(() => {
        commit('FATOOR_COUNTER')
      }, 1000)
    }
  }

}
