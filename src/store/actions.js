import axios from 'axios'
import moment from 'moment'
import ODisk from 'o.disk'
import _ from 'lodash'
const API_URL = 'https://ezanvakti.herokuapp.com/'

export default {

  GET_COUNTRY ({ commit }) {
    let data = ODisk.ulkeler
    if (data) {
      return commit('SET_COUNTRY', data)
    }
    axios.get(API_URL + 'ulkeler').then((res) => {
      if (res.status === 200) {
        ODisk.ulkeler = res.data
        commit('SET_COUNTRY', res.data)
      }
    })
  },

  GET_STATE ({ commit }) {
    let country = ODisk.countryId
    let data = ODisk[country + '_sehirler']
    if (data) {
      return commit('SET_STATE', data)
    }
    axios.get(API_URL + 'sehirler?ulke=' + country).then((res) => {
      if (res.status === 200) {
        ODisk[country + '_sehirler'] = res.data
        commit('SET_STATE', res.data)
      }
    })
  },

  GET_TOWN ({ commit }) {
    let state = ODisk.stateId
    let data = ODisk[state + '_ilceler']
    if (data) {
      return commit('SET_TOWN', data)
    }
    axios.get(API_URL + 'ilceler?sehir=' + state).then((res) => {
      if (res.status === 200) {
        ODisk[state + '_ilceler'] = res.data
        commit('SET_TOWN', res.data)
      }
    })
  },

  GET_PERIOD ({ dispatch, commit, state }) {
    axios.get(API_URL + 'vakitler?ilce=' + ODisk.townId).then((res) => {
      if (res.status === 200) {
        commit('SET_ALL_PERIODS', res.data, false)
        commit('SET_TODAY_PERIODS')
      }
    })
  },

  INIT_APP ({ dispatch, commit, state }) {
    const PERIODS = ODisk.allPeriods || []

    if (PERIODS.length > 0) {
      const NOW = new Date()

      let day = NOW.getDate().toString()
      day = _.size(day) === 1 ? `0${day}` : day
      let month = (NOW.getMonth() + 1).toString()
      month = _.size(month) === 1 ? `0${month}` : month

      const TODAY = _.find(PERIODS, ['MiladiTarihKisa', `${day}.${month}.${NOW.getFullYear()}`])

      if (TODAY) {
        commit('SET_ALL_PERIODS', PERIODS, true)
        commit('SET_TODAY_PERIODS')
      } else {
        dispatch('GET_PERIOD')
      }
    } else {
      dispatch('GET_PERIOD')
    }
  },

  START_COUNTER ({ dispatch, commit, state }) {
    commit('FIND_ACTIVE_PERIOD')
    commit('TOTAL_TIME')
    dispatch('CHECK_RAMADAN')

    setInterval(() => {
      commit('COUNTER')
      if (state.counter === 0) {
        commit('FIND_ACTIVE_PERIOD')
      }
    }, 1000)
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
