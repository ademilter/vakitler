import http from '../utils/http'
const API = http.instance

export default {
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
