import _ from 'lodash'

export default {
  il (state) {
    return state.il
  },
  ilce (state) {
    return state.ilce
  },
  zaman (state) {
    return state.zaman
  },
  vakitler (state) {
    return _.omit(state.vakitler, ['kible'])
  }
}
