import axios from 'axios'

export default {
  getData (context) {
    const countryId = 2
    const eyaletId = 539
    const townId = 9541
    const URL = `http://diyanet-api.herokuapp.com/namaz_vakti/${countryId}/${eyaletId}/${townId}/Haftalik`
    axios.get(URL).then((res) => {
      if (res.status === 200) {
        context.commit('SET_PERIODS', res.data[0])
        context.commit('FIND_CURRENT_PERIOD')
        context.commit('FIND_NEXT_PERIOD')
      }
    })
  }
}
