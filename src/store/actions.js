import http from '../utils/http'
const API = http.instance

export default {
  async init({ dispatch, commit }) {
    try {
      await dispatch('fetchCountries')
      commit('SAVE_COUNTRY_ID', '2')
      await dispatch('fetchCities')
      commit('SAVE_CITY_ID', '539')
      await dispatch('fetchTowns')
      commit('SAVE_TOWN_ID', '9541')
      await dispatch('getTimes')
    } catch (e) {
      console.log(e)
    }
  },
  async fetchCountries({ commit }) {
    try {
      const { data } = await API.get('ulkeler')
      commit('SAVE_COUNTRIES', data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchCities({ commit, state }) {
    try {
      const { data } = await API.get(`sehirler?ulke=${state.countryId}`)
      commit('SAVE_CITIES', data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTowns({ commit, state }) {
    try {
      const { data } = await API.get(`ilceler?sehir=${state.cityId}`)
      commit('SAVE_TOWNS', data)
    } catch (e) {
      console.log(e)
    }
  },
  async getTimes({ commit, state }) {
    try {
      const { data } = await API.get(`vakitler?ilce=${state.townId}`)
      commit('SAVE_TIMES', data)
    } catch (e) {
      console.log(e)
    }
  }
}
