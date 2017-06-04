import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
const API_URL = 'https://ezanvakti.herokuapp.com/'

export default {

  GET_COUNTRY ({ dispatch, commit, state }) {
    axios.get(API_URL + 'ulkeler').then((res) => {
      if (res.status === 200) {
        commit('SET_COUNTRY', res.data)
      }
    })
  },

  GET_STATE ({ dispatch, commit, state }) {
    axios.get(API_URL + 'sehirler?ulke=' + localStorage.getItem('countryId')).then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        commit('SET_STATE', res.data)
      }
    })
  },

  GET_TOWN ({ dispatch, commit, state }) {
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
        dispatch('findPeriod')
        commit('TOTAL_TIME')

        setInterval(() => {
          commit('COUNTER')
          let counter = _.map(state.Counter, _.unary(parseInt))
          if (_.sum(counter) === 0) {
            dispatch('findPeriod')
          }
        }, 1000)

        dispatch('checkRamazan')
      }
    })
  },

  findPeriod ({ commit, state }) {
    commit('FIND_CURRENT_PERIOD')
    commit('FIND_NEXT_PERIOD')
  },

  checkRamazan ({ commit, state }) {
    let status = moment(new Date()).isBetween(state.Ramadan.start, state.Ramadan.end, null, '[]')
    commit('RAMAZAN_DA_MIYIZ', status)
    if (status) {
      setInterval(() => {
        commit('IFTARA_KALAN_SURE')
      }, 1000)
    }
  }

}
