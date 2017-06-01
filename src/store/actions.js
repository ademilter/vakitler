import axios from 'axios'

export default {
  getData (context) {
    // const countryId = 2
    // const eyaletId = 539
    const townId = 9541
    const URL = `https://ezanvakti.herokuapp.com/vakitler?ilce=${townId}`
    return axios.get(URL).then((res) => {
      if (res.status === 200) {
        context.commit('SET_PERIODS', res.data)
        context.commit('FIND_CURRENT_PERIOD')
        context.commit('FIND_NEXT_PERIOD')
      }
    })
  }
}
