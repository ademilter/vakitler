import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

export default {

  getData ({ dispatch, commit, state }) {
    const townId = 9541
    const URL = `https://ezanvakti.herokuapp.com/vakitler?ilce=${townId}`
    return axios.get(URL).then((res) => {
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
